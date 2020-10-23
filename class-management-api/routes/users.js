const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { ROLE_USER, ROLE_TUTOR } = require("../common/roles");
const { bodyValidator } = require('../common/http');
const { auth, checkRoles } = require('../common/auth');

router.post('/auth/register', async (req, res) => {
    if (!bodyValidator(Object.keys(req.body), ['username', 'password', 'email', 'name', 'surname'])) {
        return res.status(400).json({ message: 'Invalid request body' });
    }
    const findUsers = await User.find({ $or: [ { username: req.body.username }, { email: req.body.email } ] });
    if (findUsers.length > 0) {
        return res.status(400).json({ message: 'Username or email already in use' });
    }
    const user = new User(req.body);
    user.roles.push({ role: ROLE_USER });
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

router.post('/tutor', auth, checkRoles([ROLE_USER]), async (req, res) => {
    const user = req.user;
    user.roles.push({ role: ROLE_TUTOR })
    await user.save();
    res.status(200).json(user);
});

router.get('/me', auth, checkRoles([ROLE_USER]), async (req, res) => {
    res.status(200).json(req.user);
});

router.get('/my-courses', auth, async (req, res) => {
    const user = req.user;
    const courses = await user.courses();
    res.json(courses);
});

router.get('/my-assignments', auth, async (req, res) => {
    const user = req.user;
    const courses = await user.coursesWithAssignments();
    res.json(courses);
});

router.get('/created-courses', auth, checkRoles([ROLE_TUTOR]), async (req, res) => {
    const courses = await req.user.createdCourses();
    res.json(courses);
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ tutor: `${user.name} ${user.surname}` });
    } catch (e) {
        res.status(401).json({ message: 'Could not load item' });
    }
});

module.exports = router;



