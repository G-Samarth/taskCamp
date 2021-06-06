const Chat = require('./models/chat');

const users = [];

const addUser = async (userId, socketId) => {
    const user = users.find((user) => user.userId === userId);

    if (user && user.socketId === socketId) return users;
    else {
        if (user && user.socketId !== socketId) {
            removeUser(user.socketId);
        }
        const newUser = { userId, socketId };
        users.push(newUser);
        return users;
    }
};

const removeUser = ({ socketId }) => {
    const indexOf = users.map((user) => user.socketId).indexOf(socketId);
    users.splice(indexOf, 1);

    return users;
};

const findConnectedUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

const loadMessages = async ({ userId, messagesWith, projectId }) => {
    try {
        let user = await Chat.findOne({ user: userId });

        let chat = user.chats.find(
            (chat) =>
                chat.messagesWith.toString() === messagesWith &&
                chat.project.toString() === projectId
        );

        if (!chat) {
            chat = {
                messagesWith: messagesWith,
                project: projectId,
                messages: [],
            };
            user.chats.unshift(chat);
            await user.save();
        }

        return { chat };
    } catch (error) {
        console.log(error);
    }
};

const sendMessage = async ({ userId, sendToId, projectId, message }) => {
    try {
        const user = await Chat.findOne({ user: userId });
        const sendTo = await Chat.findOne({ user: sendToId });

        const newMessage = {
            text: message,
            sender: userId,
            receiver: sendToId,
            date: Date.now(),
        };

        //sender
        const prevChat = user.chats.find(
            (chat) =>
                chat.messagesWith.toString() === sendToId &&
                chat.project.toString() === projectId
        );

        if (prevChat) {
            prevChat.messages.push(newMessage);
            await user.save();
        } else {
            const newChat = {
                messagesWith: sendToId,
                project: projectId,
                messages: [newMessage],
            };
            user.chats.unshift(newChat);
            await user.save();
        }

        //receiver
        const prevChatForReceiver = sendTo.chats.find(
            (chat) =>
                chat.messagesWith.toString() === userId &&
                chat.project.toString() === projectId
        );

        if (prevChatForReceiver) {
            prevChatForReceiver.messages.push(newMessage);
            await sendTo.save();
        } else {
            const newChat = {
                messagesWith: userId,
                project: projectId,
                messages: [newMessage],
            };
            sendTo.chats.unshift(newChat);
            await sendTo.save();
        }

        return { newMessage };
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addUser,
    removeUser,
    findConnectedUser,
    loadMessages,
    sendMessage,
};
