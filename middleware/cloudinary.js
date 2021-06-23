const config = require('config');

const cloudinaryName = config.get('cloudinaryName');
const cloudinaryKey = config.get('cloudinaryKey');
const cloudinarySecret = config.get('cloudinarySecret');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryKey,
    api_secret: cloudinarySecret,
});

module.exports = { cloudinary };
