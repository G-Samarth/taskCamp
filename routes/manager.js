const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const checkManager = require('../middleware/manager');

const User = require('../models/user');
const Project = require('../models/project');
const checkObjectId = require('../middleware/checkObjectId');

const router = express.Router();

// @route    POST /manager/projects
// @desc     Create new project
// @access   Private
router.post(
    '/projects',
    [
        auth,
        checkManager,
        [
            check('leadEmail', 'Please include a valid email').isEmail(),
            check('title', 'Please enter at least 10 characters').isLength({
                min: 10,
            }),
            check(
                'description',
                'Please enter at least 50 characters'
            ).isLength({
                min: 50,
            }),
            check(
                'resources.*.resourceEmail',
                'Please include a valid email'
            ).isEmail(),
            check(
                'resources.*.taskTitle',
                'Please enter at least 5 characters'
            ).isLength({
                min: 5,
            }),
            check(
                'resources.*.taskDescription',
                'Please enter at least 10 characters'
            ).isLength({
                min: 10,
            }),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, leadEmail, resources } = req.body;

        try {
            const assignedBy = req.user.id;
            const lead = await User.findOne({ email: leadEmail });
            const assignedTo = lead.id;

            const project = new Project({
                title,
                description,
                assignedBy,
                assignedTo,
                resources,
            });

            await project.save();

            res.json({ msg: 'Project Added' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

// @route    GET /manager/projects
// @desc     Get all projects
// @access   Private
router.get('/projects', [auth, checkManager], async (req, res) => {
    const user = req.user.id;

    try {
        Project.find({ assignedBy: user }, (err, projects) => {
            if (err) {
                return res
                    .status(500)
                    .json({ errors: [{ msg: 'Mongo Server Error' }] });
            }

            res.json(projects);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }

    //Might need to convert ids to user object
});

// @route    GET /manager/projects/:projectId
// @desc     Get project by ID
// @access   Private
router.get(
    '/projects/:projectId',
    [auth, checkManager, checkObjectId('projectId')],
    async (req, res) => {
        const user = req.user.id;
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);

        if (!project) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Project Not Found' }] });
        }

        try {
            if (project.assignedBy.toString() !== user) {
                return res
                    .status(401)
                    .json({ errors: [{ msg: 'User Not Authorized' }] });
            }

            res.json(project);
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

// @route    DELETE /manager/projects/:projectId
// @desc     Delete project
// @access   Private
router.delete(
    '/projects/:projectId',
    [auth, checkManager, checkObjectId('projectId')],
    async (req, res) => {
        const user = req.user.id;
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);

        if (!project) {
            return res
                .status(404)
                .json({ errors: [{ msg: 'Project Not Found' }] });
        }

        try {
            if (project.assignedBy.toString() !== user) {
                return res
                    .status(401)
                    .json({ errors: [{ msg: 'User Not Authorized' }] });
            }

            await project.remove();

            res.json({ msg: 'Project Deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

module.exports = router;
