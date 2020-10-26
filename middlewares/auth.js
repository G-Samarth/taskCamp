const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res
            .status(401)
            .json({ errors: [{ msg: 'Authorization Denied' }] });
    }

    try {
        jwt.verify(token, config.get('jsonSecret'), (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .json({ errors: [{ msg: 'Authorization Denied' }] });
            }

            req.user = decoded.user;
            next();
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
};
