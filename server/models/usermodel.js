const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    phone : {
        type: Number,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    isAdmin : {
        type: Boolean,
        default: false
    }
})

const User = new mongoose.model('User', userSchema);
module.exports = User;