const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const Assignment = require('../model/Assignment');
const Upload = require('../model/Upload');
const { ROLE_TUTOR } = require('../common/roles');
const { auth, checkRoles } = require('../common/auth');

router.patch('/:id', auth, checkRoles([ROLE_TUTOR]), async (req, res) => {
    try {
        const assignment = await Assignment.getAssignmentByIdAndUpdate(req.params.id, req.body, req.user._id.toString());
        res.status(200).json(assignment);
    } catch (e) {
        res.status(401).json({ message: 'Unable to access item' });
    }
});

router.post('/:id/setup', auth, checkRoles([ROLE_TUTOR]), upload.single('file'), async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id).populate('setup');
        if (!assignment || assignment.owner !== req.user._id.toString() || !req.file) {
            return res.status(400).json({ message: 'Unable to access item' });
        }
        if (assignment.setup._id) {
            await assignment.setup.remove();
        }
        const file = req.file;
        const upload = new Upload({ mimetype: file.mimetype, data: file.buffer, name: file.originalname, owner: assignment._id.toString() });
        await upload.save();
        assignment.setup = upload;
        await assignment.save();
        res.status(201).json(assignment);
    } catch (e) {
        res.status(401).json({ message: 'Unable to update item' })
    }
});

router.delete('/:id', auth, checkRoles([ROLE_TUTOR]), async (req, res) => {
    try {
        const assignment = await Assignment.getAssignmentById(req.params.id);
        if (assignment.owner !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Could not delete item' });
        }
        await assignment.remove();
        res.status(200).json({ message: 'Item successfully deleted' })
    } catch (e) {
        res.status(400).json({ message: 'Could not load item' })
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const assignment = await Assignment.getAssignmentById(req.params.id);
        res.status(200).json(assignment);
    } catch (e) {
        res.status(401).json({ message: 'Unable to fetch item'});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const assignments = await Assignment.find({});
        res.status(200).json(assignments);
    } catch (e) {
        res.status(400).json({ message: 'Unable to fetch items' })
    }
});

module.exports = router;
