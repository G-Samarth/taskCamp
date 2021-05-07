const { addUser, removeUser, getUser } = require('./socket.js');

const express = require('express');
const dataBase = require('./config/db');
const io = require('socket.io')(4000, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

const app = express();

const authRoutes = require('./routes/auth');
const managerRoutes = require('./routes/manager');
const leadRoutes = require('./routes/lead');
const resourceRoutes = require('./routes/resource');

dataBase();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/manager', managerRoutes);
app.use('/lead', leadRoutes);
app.use('/resource', resourceRoutes);

const port = process.env.PORT || 5000;

io.on('connection', (socket) => {
    socket.on('join', ({ name, projectId }, callback) => {
        addUser({ id: socket.id, name, projectId });

        // socket.emit('message', {
        //     user: 'admin',
        //     text: 'Convey your issues here',
        // }); //remove later

        socket.join(projectId);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.projectId).emit('message', {
            user: user.name,
            text: message,
        });

        callback();
    });

    socket.on('disconnection', () => {
        removeUser(socket.id);
    });
});

app.listen(port, (error) => {
    if (error) console.log(error);
    console.log(`Server started on port ${port}`);
});
