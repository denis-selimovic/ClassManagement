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
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

uploadSchema.statics.createUpload = async (file, owner, uploadedBy) => {
    const upload = new Upload({ mimetype: file.mimetype, data: file.buffer, name: file.originalname, owner: owner, uploadedBy: uploadedBy });
    await upload.save();
    return upload;
};

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
