const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    resources: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            taskTitle: {
                type: String,
                required: true,
            },
            taskDescription: {
                type: String,
                required: true,
            },
            messages: [
                {
                    message: {
                        name: {
                            type: String,
                        },
                        text: {
                            type: String,
                        },
                    },
                },
            ],
        },
    ],
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', ProjectSchema);
