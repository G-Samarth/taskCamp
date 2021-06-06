const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    chats: [
        {
            messagesWith: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'project',
            },
            messages: [
                {
                    text: {
                        type: String,
                        required: true,
                    },
                    sender: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user',
                    },
                    receiver: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user',
                    },
                    date: {
                        type: Date,
                    },
                },
            ],
        },
    ],
});

module.exports = mongoose.model('Chat', ChatSchema);
