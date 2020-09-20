const jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisisasecrettoken');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            return res.status(401).json({ error: 'Not authenticated correctly' });
        }
        req.user = user;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Not authenticated correctly' });
    }
};

module.exports = auth;
