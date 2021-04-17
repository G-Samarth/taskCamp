const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const checkManager = require('../middleware/manager');

const User = require('../models/user');
const Project = require('../models/project');
const checkObjectId = require('../middleware/checkObjectId');
const user = require('../models/user');

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
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, leadEmail } = req.body;

        try {
            const assignedBy = req.user.id;
            const lead = await User.findOne({ email: leadEmail });
            if (!lead) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Email ID' }] });
            }
            const assignedTo = lead.id;

            const project = new Project({
                title,
                description,
                assignedBy,
                assignedTo,
            });

            await project.save();

            const projectId = { project: project.id };
            const manager = await User.findById(assignedBy);

            let newProject = manager.projects;
            newProject.unshift(projectId);
            manager.projects = newProject;
            await manager.save();

            newProject = lead.projects;
            newProject.unshift(projectId);
            lead.projects = newProject;
            await lead.save();

            res.json({ msg: 'Project Created' });
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
    try {
        const user = await User.findById(req.user.id);

        let allProjects = [];
        allProjects = await Promise.all(
            user.projects.map(async (proj) => {
                const projectId = proj.project;

                const project = await Project.findById(projectId);

                return project;
            })
        );

        res.json(allProjects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
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

            const manager = await User.findById(user);
            const lead = await User.findById(project.assignedTo);

            let updatedProjects = manager.projects.filter(
                (project) => project.project.toString() !== projectId
            );
            manager.projects = updatedProjects;
            await manager.save();

            updatedProjects = lead.projects.filter(
                (project) => project.project.toString() !== projectId
            );
            lead.projects = updatedProjects;
            await lead.save();

            await Promise.all(
                project.resources.map(async (resource) => {
                    const projectResource = await User.findById(resource.user);
                    updatedProjects = projectResource.projects.filter(
                        (project) => project.project.toString() !== projectId
                    );
                    projectResource.projects = updatedProjects;
                    await projectResource.save();
                })
            );

            await project.remove();

            res.json({ msg: 'Project Deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

module.exports = router;
