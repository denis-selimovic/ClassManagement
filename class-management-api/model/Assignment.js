const mongoose = require('mongoose');
const { Schema } = mongoose;
const Upload = require('./Upload');

const assignmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    uploads: [{
        type: Schema.Types.ObjectId,
        ref: 'Upload'
    }],
    setup: {
        type: Schema.Types.ObjectId,
        ref: 'Upload'
    },
    dueDate: {
        type: Date,
        required: true
    },
    extensions: [{
        extension: {
            type: String
        }
    }],
    owner: {
        type: String,
        required: true
    }
});

assignmentSchema.methods.setExtensions = function (extensions) {
    this.extensions = extensions.split(',').map(e => {
        return { extension: e.trim() };
    });
};

assignmentSchema.methods.course = async function () {
    const Course = this.model('Course');
    return await Course.findOne({ assignments: { $elemMatch: { $eq: { _id: this._id } } } }).exec();
};

assignmentSchema.statics.getAssignmentById = async id => {
    const assignment = await Assignment.findById(id).populate('uploads');
    if (!assignment) {
        throw new Error();
    }
    return assignment;
};

assignmentSchema.pre('remove', async function (next) {
    await Upload.deleteMany({ owner: this._id.toString() });
    next();
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
