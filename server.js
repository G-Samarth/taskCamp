const express = require('express');
const dataBase = require('./config/db');

const app = express();

const authRoutes = require('./routes/auth');

dataBase();

app.use(express.json());

app.use('/auth', authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, (error) => {
    if (error) console.log(error);
    console.log(`Server started on port ${port}`);
});
