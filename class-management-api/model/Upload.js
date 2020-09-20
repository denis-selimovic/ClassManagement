const mongoose = require('mongoose');
const { Schema } = mongoose;

const uploadSchema = new Schema({
    mimetype: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
