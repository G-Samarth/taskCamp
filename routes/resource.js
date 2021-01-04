const express = require('express');

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

        const allProjects = await Promise.all(
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

        if (!allProjects.length) {
            return res.json({ msg: 'No Projects' });
        }

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

module.exports = router;
