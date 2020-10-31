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

                return foundProject;
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

module.exports = router;
