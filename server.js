const {
    addUser,
    loadMessages,
    findConnectedUser,
    removeUser,
    sendMessage,
} = require('./socket');

const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const dataBase = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const authRoutes = require('./routes/auth');
const managerRoutes = require('./routes/manager');
const leadRoutes = require('./routes/lead');
const resourceRoutes = require('./routes/resource');

dataBase();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/manager', managerRoutes);
app.use('/lead', leadRoutes);
app.use('/resource', resourceRoutes);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

io.on('connection', (socket) => {
    socket.on('join', async ({ userId }, callback) => {
        await addUser(userId, socket.id);
        callback();
    });

    socket.on('loadMessages', async ({ userId, messagesWith, projectId }) => {
        try {
            const { chat } = await loadMessages({
                userId,
                messagesWith,
                projectId,
            });
            socket.emit('messagesLoaded', { chat });
        } catch (error) {
            console.log(error);
        }
    });

    socket.on(
        'sendMessage',
        async ({ userId, sendToId, projectId, message }, callback) => {
            try {
                const { newMessage } = await sendMessage({
                    userId,
                    sendToId,
                    projectId,
                    message,
                });

                const receiverSocket = findConnectedUser(sendToId);
                if (receiverSocket) {
                    io.to(receiverSocket.socketId).emit('messageReceived', {
                        newMessage,
                    });
                }

                socket.emit('messageSent', { newMessage });

                callback();
            } catch (error) {
                console.log(error);
            }
        }
    );

    socket.on('disconnection', () => {
        removeUser(socket.id);
    });
});

server.listen(port, (error) => {
    if (error) console.log(error);
    console.log(`Server started on port ${port}`);
});
