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
    },
    profile : {
        type: String,
        default: ""
    },
    cart : [
    {
        product : {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Product"
        },
        quantity : {
            type: Number,
            default: 1
        },
    }],
    address : {
        type: String,
    },
    orders : [
        {
            product : {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Product"
            },
            quantity : {
                type: Number,
                default: 1
            },
            total : {
                type: Number,
                default: 0
            },
            status : {
                type: String,
                enum: ["Processing", "Delivered", "Rejected"],
                default: "Processing"
            }
        }
    ]
})

const User = new mongoose.model('User', userSchema);
module.exports = User;