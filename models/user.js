const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    projects: [
        {
            project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'project',
            },
        },
    ],
});

module.exports = mongoose.model('User', UserSchema);
