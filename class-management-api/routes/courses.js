const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Course = require('../model/Course');
const Lesson = require('../model/Lesson');
const Assignment = require('../model/Assignment')
const Upload = require('../model/Upload');
const { ROLE_TUTOR, ROLE_USER } = require('../common/roles');
const { bodyValidator } = require('../common/http');
const { auth, checkRoles } = require('../common/auth');

router.post('/create', auth, checkRoles([ROLE_TUTOR]), async (req, res) => {
    if (!bodyValidator(Object.keys(req.body), ['name', 'description'])) {
        return res.status(400).json({ message: 'Invalid request body' });
    }
    const findCourses = Course.find({ name: req.body.name });
    if (findCourses.length > 0) {
        return res.status(400).json({ message: 'Name already in use' });
    }
    const course = new Course(req.body);
    course.owner = req.user._id.toString();
    await course.save();
    res.status(201).json(course);
});

router.post('/enroll/:id', auth, checkRoles([ROLE_USER]), async (req, res) => {
    try {
        const course = await Course.getCourseByIdAndPopulate(req.params.id, 'students');
        const user = req.user;
        if (course.students.map(s => s._id).includes(user._id)) {
            return res.status(400).json({ message: 'User already enrolled' });
        }
        course.students.push(user);
        await course.save();
        res.status(200).json(course);
    } catch (e) {
        res.status(400).json({ message: 'Could not load item'});
    }
});

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json(courses)
    } catch (e) {
        res.status(401).json({ message: 'Could not load items' })
    }
});

router.post('/leave/:id', auth, checkRoles([ROLE_USER]), async (req, res) => {
    try {
        const course = await Course.getCourseByIdAndPopulate(req.params.id, 'students');
        const user = req.user;
        if (course.students.map(s => s._id).includes(user._id)) {
            return res.status(400).json({ message: 'User already enrolled' });
        }
        course.students = course.students.filter(s => s._id.toString() !== user._id.toString());
        await course.save();
        res.status(200).json(course);
    } catch (e) {
        res.status(400).json({ message: 'Could not load item'});
    }
});

router.get('/:id', auth, checkRoles([ROLE_USER]), async (req, res) => {
    try {
        const course = await Course.getCourseById(req.params.id);
        res.status(200).json(course);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: 'Could not load item'});
    }
});

router.get('/:id/students', auth, async (req, res) => {
    try {
        const course = await Course.getCourseByIdAndPopulate(req.params.id, 'students');
        res.status(200).json(course.students);
    } catch (e) {
        res.status(400).json({ message: 'Could not load item'});
    }
});

router.get('/:id/assignments', auth, async (req, res) => {
    try {
        const course = await Course.getCourseByIdAndPopulate(req.params.id, 'assignments');
        res.status(200).json(course.assignments);
    } catch (e) {
        res.status(400).json({ message: 'Could not load item'});
    }
});

router.get('/:id/lessons', auth, async (req, res) => {
    try {
        const course = await Course.getCourseByIdAndPopulate(req.params.id, 'lessons');
        res.status(200).json(course.lessons);
    } catch (e) {
        res.status(400).json({ message: 'Could not load item'});
    }
});

router.post('/:id/lesson', auth, checkRoles([ROLE_TUTOR]), async (req, res) => {
    try {
        const course = await Course.getCourseByIdAndPopulate(req.params.id, 'lessons');
        if (course.owner !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Unable to access item' })
        }
        if (!bodyValidator(Object.keys(req.body), ['name', 'description'])) {
            return res.status(400).json({ message: 'Invalid request body' });
        }
        const lesson = new Lesson(req.body);
        lesson.owner = req.user._id.toString();
        await lesson.save();
        course.lessons.push(lesson);
        await course.save();
        res.status(201).json(course);
    } catch (e) {
        res.status(400).json({ message: 'Unable to load item' });
    }
});

router.post('/:id/assignment', auth, checkRoles([ROLE_TUTOR]), upload.single('file'), async (req, res) => {
    try {
        const course = await Course.getCourseByIdAndPopulate(req.params.id, 'assignments');
        if (course.owner !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Unable to access item' })
        }
        if (!bodyValidator(Object.keys(req.body), ['name', 'dueDate', 'extensions'])) {
            return res.status(400).json({ message: 'Invalid request body' });
        }
        const assignment = new Assignment({ name: req.body.name, dueDate: req.body.dueDate });
        assignment.owner = req.user._id.toString();
        assignment.setExtensions(req.body.extensions);
        if (req.file) {
            const upload = await Upload.createUpload(req.file, assignment._id.toString(), req.user._id);;
            assignment.setup = upload;
        }
        await assignment.save();
        course.assignments.push(assignment);
        await course.save();
        res.status(201).json(course);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: 'Unable to load item' });
    }
});

module.exports = router;
