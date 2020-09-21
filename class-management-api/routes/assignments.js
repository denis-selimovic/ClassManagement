const express = require('express');
const router = express.Router();
const Assignment = require('../model/Assignment');
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
