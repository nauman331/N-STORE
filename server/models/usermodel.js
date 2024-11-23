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
    orders: [
        {
          product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Product"
          },
          total: {
            type: Number,
            default: 0,
            required: true
          },
          paid: {
            type: Number,
            default: 0,
            required: true
          },
          status: {
            type: String,
            enum: ["Approving","Processing", "Delivered", "Rejected"],
            default: "Approving"
          },
          proofpic: { 
            type: String,
            required: true
          },
          tId: {
            type: String,
            required: true
          }
        }
      ]
})

const User = new mongoose.model('User', userSchema);
module.exports = User;