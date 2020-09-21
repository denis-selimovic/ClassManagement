const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    this.extensions = extensions.split(',').map(e => { e.trim() });
};

assignmentSchema.methods.course = async function () {
    const Course = this.model('Course');
    return await Course.findOne({ assignments: { $elemMatch: { $eq: { _id: this._id } } } }).exec();
};

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
