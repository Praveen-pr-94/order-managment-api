const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Number,
        default: 0
    },
}, {timestamps: true});
const userModel = mongoose.model('users', userSchema);
module.exports = userModel;

