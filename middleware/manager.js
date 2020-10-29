const User = require('../models/user');

module.exports = async (req, res, next) => {
    const id = req.user.id;

    const user = await User.findById(id);
    const userType = user.userType;

    if (userType != 'Manager') {
        return res.status(401).json({ errors: [{ msg: 'Not Allowed' }] });
    }
    next();
};
