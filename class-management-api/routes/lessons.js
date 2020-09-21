const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Lesson = require('../model/Lesson');
const Upload = require('../model/Upload');
const { auth } = require('../common/auth');
const { bodyValidator } = require("../common/http");

router.patch('/:id', auth, async (req, res) => {
    try {
        const lesson = await Lesson.getLessonByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(lesson);
    } catch (e) {
        res.status(400).json({ message: 'Unable to load item' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const lesson = await Lesson.getLessonById(req.params.id);
        await lesson.remove();
        res.status(200).json({ message: 'Item successfully deleted' });
    } catch (e) {
        res.send(400).json({ message: 'Unable to delete item' });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const lesson = await Lesson.getLessonById(req.params.id);
        res.status(200).json(lesson);
    } catch (e) {
        res.status(400).json({ message: 'Unable to fetch item' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const lessons = await Lesson.find({});
        res.status(200).json(lessons);
    } catch (e) {
        res.status(400).json({ message: 'Unable to fetch items' })
    }
});

router.post('/:id/upload', auth, upload.single('file'), async (req, res) => {
    try {
        const lesson = await Lesson.getLessonById(req.params.id);
        const file = req.file;
        const upload = new Upload({ mimetype: file.mimetype, data: file.buffer, name: file.originalname, owner: lesson._id.toString() });
        await upload.save();
        lesson.uploads.push(upload);
        await lesson.save();
        res.status(201).json(upload);
    } catch (e) {
        res.send(400).json({ message: 'Unable to upload file' });
    }
});

router.delete('/:id/upload', auth, async (req, res) => {
    try {
        if (!bodyValidator(Object.keys(req.body), ['file'])) {
            return res.status(400).json({ message: 'Invalid request body' });
        }
        const lesson = await Lesson.getLessonById(req.params.id);
        const uploadFile = req.body.file;
        const upload = await Upload.findById(uploadFile);
        lesson.uploads = lesson.uploads.filter(u => u._id.toString() !== uploadFile);
        await lesson.save();
        await upload.remove();
        res.status(201).json({ message: 'File successfully deleted' });
    } catch (e) {
        res.send(400).json({ message: 'Unable to delete file' });
    }
});

module.exports = router;