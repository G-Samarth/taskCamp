const express = require('express');
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const checkLead = require('../middleware/lead');
const checkObjectId = require('../middleware/checkObjectId');

const User = require('../models/user');
const Project = require('../models/project');
const Chat = require('../models/chat');

const router = express.Router();

// @route    GET /lead/projects
// @desc     Get all Projects
// @access   Private
router.get('/projects', [auth, checkLead], async (req, res) => {
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
// @desc     Add resource
// @access   Private
router.post(
    '/projects/:projectId',
    [
        auth,
        checkLead,
        checkObjectId('projectId'),
        [
            check('resourceEmail', 'Please include a valid email').isEmail(),
            check('taskTitle', 'Please enter at least 5 characters').isLength({
                min: 5,
            }),
            check(
                'taskDescription',
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
            let user = req.user.id;
            const projectId = req.params.projectId;
            const { resourceEmail, taskTitle, taskDescription } = req.body;

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

            user = null;
            const newResource = { user, taskTitle, taskDescription };

            user = await User.findOne({ email: resourceEmail });
            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Email ID' }] });
            }

            let flag = false;
            project.resources.forEach((project) => {
                if (project.user.toString() === user.id) {
                    flag = true;
                    return res
                        .status(409)
                        .json({ errors: [{ msg: 'Resource Already Added' }] });
                }
            });
            if (flag) return;

            const newProject = user.projects;
            newProject.unshift({ project: project.id });
            user.projects = newProject;
            await user.save();

            newResource.user = user.id;
            project.resources.push(newResource);
            await project.save();

            res.json({ msg: 'New Resource Added' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

// @route    PUT /lead/projects/:projectId/:id
// @desc     Update resource
// @access   Private
router.put(
    '/projects/:projectId/:id',
    [
        auth,
        checkLead,
        checkObjectId('projectId'),
        checkObjectId('id'),
        [
            check('taskTitle', 'Please enter at least 5 characters').isLength({
                min: 5,
            }),
            check(
                'taskDescription',
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
            const leadId = req.user.id;
            const projectId = req.params.projectId;
            const resourceId = req.params.id;
            const { taskTitle, taskDescription } = req.body;

            const project = await Project.findById(projectId);

            if (!project) {
                return res
                    .status(404)
                    .json({ errors: [{ msg: 'Project Not Found' }] });
            }

            if (project.assignedTo.toString() !== leadId) {
                return res
                    .status(401)
                    .json({ errors: [{ msg: 'User Not Authorized' }] });
            }

            await project.resources.forEach((resource) => {
                if (resource.user.toString() === resourceId) {
                    resource.taskTitle = taskTitle;
                    resource.taskDescription = taskDescription;
                    return;
                }
            });
            await project.save();

            res.json({ msg: 'Resource Updated' });
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
    [auth, checkLead, checkObjectId('projectId'), checkObjectId('id')],
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

            //Deleting Project from Resource's Profile
            const resource = await User.findById(resourceId);
            const updatedProjects = resource.projects.filter(
                (project) => project.project.toString() !== projectId
            );
            resource.projects = updatedProjects;
            await resource.save();

            //Deleting Resource from the Project
            const updatedResources = project.resources.filter(
                (resource) => resource.user.toString() !== resourceId
            );
            project.resources = updatedResources;
            await project.save();

            //Deleting Chat from Resource's Profile
            const resourceChat = await Chat.findOne({
                user: resourceId,
            });
            let updatedChats = resourceChat.chats.filter(
                (chat) => chat.project.toString() !== projectId
            );
            resourceChat.chats = updatedChats;
            await resourceChat.save();

            //Deleting Chat from Lead's Profile
            const leadChat = await Chat.findOne({
                user: user,
            });
            updatedChats = leadChat.chats.filter(
                (chat) =>
                    chat.project.toString() !== projectId &&
                    chat.messagesWith.toString() !== resourceId
            );
            leadChat.chats = updatedChats;
            await leadChat.save();

            res.json({ msg: 'Resource Deleted' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
    }
);

module.exports = router;
