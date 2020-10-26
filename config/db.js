const mongoose = require('mongoose');
const config = require('config');

const mongoURI = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
