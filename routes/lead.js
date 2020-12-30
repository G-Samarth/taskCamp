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
    try {
        const user = await User.findById(req.user.id);

        const allProjects = await Promise.all(
            user.projects.map(async (proj) => {
                const projectId = proj.project;

                const project = await Project.findById(projectId);

                return project;
            })
        );

        if (!allProjects.length) {
            return res.json({ msg: 'No Projects' });
        }

        res.json(allProjects);
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

            let projectResources = project.resources;
            await Promise.all(
                resources.map(async (resource) => {
                    const {
                        resourceEmail,
                        taskTitle,
                        taskDescription,
                    } = resource;

                    let user = null;
                    const newResource = { user, taskTitle, taskDescription };

                    user = await User.findOne({ email: resourceEmail });
                    if (!user) {
                        return res
                            .status(400)
                            .json({ errors: [{ msg: 'Invalid Email ID' }] });
                    }
                    const newProject = user.projects;
                    newProject.unshift({ project: project.id });
                    user.projects = newProject;
                    await user.save();

                    newResource.user = user.id;
                    projectResources.push(newResource);
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

// @route    DELETE /lead/projects/:projectId/:id
// @desc     Delete Resource
// @access   Private
router.delete(
    '/projects/:projectId/:id',
    [auth, checkLead, checkObjectId('projectId')],
    async (req, res) => {
        const user = req.user.id;
        const projectId = req.params.projectId;
        const resourceId = req.params.id;

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

            const resource = await User.findById(resourceId);
            const updatedProjects = resource.projects.filter(
                (project) => project.project.toString() !== projectId
            );
            resource.projects = updatedProjects;
            await resource.save();

            const updatedResources = project.resources.filter(
                (resource) => resource.user.toString() !== resourceId
            );
            project.resources = updatedResources;
            await project.save();

            res.json({ msg: 'Resource Deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

module.exports = router;
