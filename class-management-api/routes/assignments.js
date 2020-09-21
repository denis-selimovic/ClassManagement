const express = require('express');
const router = express.Router();
const Assignment = require('../model/Assignment');

router.delete('/:id', async (req, res) => {
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

module.exports = router;
