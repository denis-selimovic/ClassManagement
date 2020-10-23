const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const { getJwtSecret } = require('../common/config');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    roles: [{
        role: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id: this._id.toString()}, getJwtSecret());
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

userSchema.methods.courses = async function () {
    const Course = this.model('Course');
    return await Course.find({students: {$elemMatch: {$eq: {_id: this._id}}}});
}

userSchema.methods.createdCourses = async function () {
    const Course = this.model('Course');
    return await Course.find({ owner: this._id });
}

userSchema.methods.coursesWithAssignments = async function () {
    const Course = this.model('Course');
    return await Course.find({ students: { $elemMatch: { $eq: { _id: this._id } } } }).populate('assignments');
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
