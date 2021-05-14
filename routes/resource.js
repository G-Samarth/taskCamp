const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');

const User = require('../models/user');
const Project = require('../models/project');
const checkObjectId = require('../middleware/checkObjectId');

const router = express.Router();

// @route    GET /resource/projects
// @desc     Get all projects
// @access   Private
router.get('/projects', [auth], async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        let allProjects = [];
        allProjects = await Promise.all(
            user.projects.map(async (proj) => {
                const projectId = proj.project;

                const project = await Project.findById(projectId);

                let foundProject = {};
                project.resources.forEach((project) => {
                    if (project.user.toString() === req.user.id) {
                        foundProject = project;
                        return;
                    }
                });

                return {
                    _id: project._id,
                    assignedBy: project.assignedTo,
                    title: foundProject.taskTitle,
                    description: foundProject.taskDescription,
                };
            })
        );

        res.json(allProjects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});

// @route    GET /resource/projects/:projectId
// @desc     Get project by ID
// @access   Private
router.get(
    '/projects/:projectId',
    [auth, checkObjectId('projectId')],
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
            let resProject = {};
            project.resources.map((resource) => {
                if (resource.user.toString() === user) {
                    resProject = resource;
                }
            });

            res.json({
                assignedBy: project.assignedTo,
                title: resProject.taskTitle,
                description: resProject.taskDescription,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

// @route    POST /resource/projects/:projectId/chat
// @desc     Enter a message
// @access   Private
router.post(
    '/projects/:projectId/chat',
    [
        auth,
        checkObjectId('projectId'),
        [check('text', 'Chat box is empty.').not().isEmpty()],
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { text } = req.body;
        const userId = req.user.id;
        const projectId = req.params.projectId;
        try {
            const user = await User.findById(userId);
            const name = user.name.trim();
            const project = await Project.findById(projectId);

            const message = { name, text };

            project.resources.map((resource) => {
                if (resource.user.toString() === userId) {
                    resource.messages.push({ message });
                }
            });
            await project.save();

            res.json({ msg: 'Message Delivered' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

// @route    GET /resource/projects/:projectId/chat
// @desc     Get all messages
// @access   Private
router.get(
    '/projects/:projectId/chat',
    [auth, checkObjectId('projectId')],
    async (req, res) => {
        const userId = req.user.id;
        const projectId = req.params.projectId;
        try {
            const project = await Project.findById(projectId);

            let messages = [];
            project.resources.map((resource) => {
                if (resource.user.toString() === userId) {
                    messages = resource.messages;
                    return;
                }
            });

            res.json(messages);
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

module.exports = router;
