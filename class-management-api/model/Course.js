const mongoose = require('mongoose');
const { Schema } = mongoose;
const Assignment = require('./Assignment');

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }]
});

courseSchema.statics.getCourseById = async id => {
    const course = await Course.findById(id).populate('students').populate('lessons').populate({ path: 'assignments', model: Assignment });
    if (!course) {
        throw new Error();
    }
    return course;
};

courseSchema.statics.getCourseByIdAndPopulate = async (id, collection) => {
    const course = await Course.findById(id).populate(collection);
    if (!course) {
        throw new Error();
    }
    return course;
}

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
