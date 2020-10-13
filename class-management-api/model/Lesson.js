const mongoose = require('mongoose');
const { Schema } = mongoose;
const { partialBodyValidator } = require("../common/http");
const Upload = require('../model/Upload');

const lessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    uploads: [{
        type: Schema.Types.ObjectId,
        ref: 'Upload'
    }],
    owner: {
        type: String,
        required: true
    },
    courseId: {
        type: String,
        required: true
    }
});

lessonSchema.statics.getLessonById = async id => {
    const lesson = await Lesson.findById(id).populate('uploads');
    if (!lesson) {
        throw new Error();
    }
    return lesson;
};

lessonSchema.statics.getLessonByIdAndUpdate = async (id, body, userId) => {
    if (!partialBodyValidator(Object.keys(body), ['name', 'description'])) {
        throw new Error();
    }
    const lesson = await Lesson.findById(id);
    if (!lesson || lesson.owner !== userId) {
        throw new Error();
    }
    Object.keys(body).forEach(key => lesson[key] = body[key]);
    await lesson.save();
    return lesson;
};

lessonSchema.methods.course = async function () {
    const Course = this.model('Course');
    return await Course.findOne({ lessons: { $elemMatch: { $eq: { _id: this._id } } } }).exec();
}

lessonSchema.pre('remove', async function (next) {
    await Upload.deleteMany({ owner: this._id.toString() });
    next();
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
