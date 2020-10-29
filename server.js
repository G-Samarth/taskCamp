const express = require('express');
const dataBase = require('./config/db');

const app = express();

const authRoutes = require('./routes/auth');
const managerRoutes = require('./routes/manager');

dataBase();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/manager', managerRoutes);

const port = process.env.PORT || 5000;

app.listen(port, (error) => {
    if (error) console.log(error);
    console.log(`Server started on port ${port}`);
});
