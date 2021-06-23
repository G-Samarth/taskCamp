const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/user');
const Chat = require('../models/chat');
const auth = require('../middleware/auth');
const checkObjectId = require('../middleware/checkObjectId');
const { cloudinary } = require('../middleware/cloudinary.js');

const router = express.Router();

// @route    POST /auth/register
// @desc     Register user
// @access   Public
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 5 or more characters'
        ).isLength({ min: 5 }),
        check('userType', 'Please select your Role').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, userType } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User Already Exists' }] });
            }

            const defaultAvatar =
                'https://res.cloudinary.com/dcye5wp22/image/upload/v1623077731/default_i3tcxd.jpg';

            user = new User({
                name,
                email,
                password,
                userType,
                avatar: defaultAvatar,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            if (userType != 'Manager')
                await new Chat({ user: user._id, chats: [] }).save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jsonSecret'),
                { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.send({ token });
                }
            );
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

// @route    POST /auth/login
// @desc     Login user
// @access   Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const chat = await Chat.findOne({ user: user._id });
            if (!chat && user.userType != 'Manager')
                await new Chat({ user: user._id, chats: [] }).save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jsonSecret'),
                { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.send({ token });
                }
            );
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

// @route    GET /auth/user
// @desc     get user by token
// @access   Public
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});

// @route    GET /auth/user/:userId
// @desc     get user by userId
// @access   Private
router.get(
    '/user/:userId',
    [auth, checkObjectId('userId')],
    async (req, res) => {
        const userId = req.params.userId;

        const user = await User.findById(userId).select('-password');

        try {
            if (!user) {
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'User Not Found' }] });
            }

            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

// @route    PUT /auth/upload
// @desc     Update Profile Image
// @access   Private
router.put('/upload', auth, async (req, res) => {
    const { uploadImage } = req.body;
    try {
        const user = await User.findById(req.user.id);

        const uploadResponse = await cloudinary.uploader.upload(uploadImage, {
            upload_preset: 'task-camp',
        });

        user.avatar = uploadResponse.url;
        await user.save();

        res.json({ msg: 'Profile Image Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});

module.exports = router;
