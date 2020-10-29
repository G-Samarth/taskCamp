const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const checkLead = require('../middleware/lead');

const User = require('../models/user');
const Project = require('../models/project');
const checkObjectId = require('../middleware/checkObjectId');

const router = express.Router();

// @route    GET /lead/projects
// @desc     Get all Projects
// @access   Private
router.get('/projects', [auth, checkLead], async (req, res) => {
    const user = req.user.id;

    try {
        Project.find({ assignedTo: user }, (err, projects) => {
            if (err) {
                return res
                    .status(500)
                    .json({ errors: [{ msg: 'Mongo Server Error' }] });
            }

            if (!projects.length) {
                return res.json({ msg: 'No Projects Found' });
            }

            res.json(projects);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});

// @route    GET /lead/projects/:projectId
// @desc     Get project by ID
// @access   Private
router.get(
    '/projects/:projectId',
    [auth, checkLead, checkObjectId('projectId')],
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
            if (project.assignedTo.toString() !== user) {
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

// @route    POST /lead/projects/:projectId
// @desc     Add resources
// @access   Private
router.post(
    '/projects/:projectId',
    [
        auth,
        checkLead,
        checkObjectId('projectId'),
        [
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

        try {
            const user = req.user.id;
            const projectId = req.params.projectId;
            const { resources } = req.body;

            const project = await Project.findById(projectId);

            if (!project) {
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'Project Not Found' }] });
            }

            if (project.assignedTo.toString() !== user) {
                return res
                    .status(401)
                    .json({ errors: [{ msg: 'User Not Authorized' }] });
            }

            const projectResources = await Promise.all(
                resources.map(async (resource) => {
                    const {
                        resourceEmail,
                        taskTitle,
                        taskDescription,
                    } = resource;

                    let user = null;
                    const newResource = { user, taskTitle, taskDescription };

                    user = await User.findOne({ email: resourceEmail });

                    newResource.user = user.id;
                    return newResource;
                })
            );

            project.resources = projectResources;
            await project.save();

            res.json({ msg: 'Resources Added' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

module.exports = router;
