const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Lesson = require('../model/Lesson');
const Upload = require('../model/Upload');
const { ROLE_TUTOR } = require('../common/roles');
const { auth, checkRoles } = require('../common/auth');
const { bodyValidator } = require("../common/http");

router.patch('/:id', auth, checkRoles([ROLE_TUTOR]), async (req, res) => {
    try {
        const lesson = await Lesson.getLessonByIdAndUpdate(req.params.id, req.body, req.user._id.toString());
        res.status(200).json(lesson);
    } catch (e) {
        res.status(400).json({ message: 'Unable to load item' });
    }
});

router.delete('/:id', auth, checkRoles([ROLE_TUTOR]), async (req, res) => {
    try {
        const lesson = await Lesson.getLessonById(req.params.id);
        if (lesson.owner !== req.user._id.toString()) {
            return res.json(403).json({ message: 'Unable to access item' });
        }
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

router.post('/:id/upload', auth, checkRoles([ROLE_TUTOR]), upload.single('file'), async (req, res) => {
    try {
        const lesson = await Lesson.getLessonById(req.params.id);
        if (lesson.owner !== req.user._id.toString()) {
            return res.json(403).json({ message: 'Unable to access item' });
        }
        const file = req.file;
        const upload = await Upload.createUpload(req.file, lesson._id.toString(), req.user._id);
        lesson.uploads.push(upload);
        await lesson.save();
        res.status(201).json(upload);
    } catch (e) {
        res.send(400).json({ message: 'Unable to upload file' });
    }
});

router.delete('/:id/upload', auth, checkRoles([ROLE_TUTOR]), async (req, res) => {
    try {
        const lesson = await Lesson.getLessonById(req.params.id);
        if (lesson.owner !== req.user._id.toString()) {
            return res.json(403).json({ message: 'Unable to access item' });
        }
        if (!bodyValidator(Object.keys(req.body), ['file'])) {
            return res.status(400).json({ message: 'Invalid request body' });
        }
        const uploadFile = req.body.file;
        const upload = await Upload.findById(uploadFile);
        lesson.uploads = lesson.uploads.filter(u => u._id.toString() !== uploadFile);
        await lesson.save();
        await upload.remove();
        res.status(201).json({ message: 'File successfully deleted' });
    } catch (e) {
        res.status(400).json({ message: 'Unable to delete file' });
    }
});

router.get('/:id/uploads', auth, async (req, res) => {
    try {
        const lesson = await Lesson.getLessonById(req.params.id);
        const formattedUploads = lesson.uploads.map(upload => {
            const { _id, name, mimetype, owner, uploadedBy } = upload;
            return { _id, name, mimetype, owner, uploadedBy, data: upload.data.toString('utf-8') };
        });
        res.status(200).json(formattedUploads);
    } catch (e) {
        res.status(400).json({ message: 'Could not fetch items' })
    }
});

module.exports = router;
