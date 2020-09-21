const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { bodyValidator } = require('../common/http');
const { auth } = require('../common/auth');

router.post('/auth/register', async (req, res) => {
    if (!bodyValidator(Object.keys(req.body), ['username', 'password', 'email', 'name', 'surname'])) {
        return res.status(400).json({ message: 'Invalid request body' });
    }
    const findUsers = await User.find({ $or: [ { username: req.body.username }, { email: req.body.email } ] });
    if (findUsers.length > 0) {
        return res.status(400).json({ message: 'Username or email already in use' });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

router.post('/auth/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({ user: user, token: token });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

router.get('/me', auth, async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;



