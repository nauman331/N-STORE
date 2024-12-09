const mongoose = require("mongoose")


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: String,
      default: "",
    },
    cart: [
      {
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    address: {
      type: String,
    },
    orders: [
      {
        products: [
          {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Product",
          }
        ],
        status : {
          type: String,
          enum: ["Placed", "Packed", "Shipped", "Rejected", "Recieved"],
          default: "Placed"
        },
        total: {
          type: Number,
          default: 0,
          required: true,
        },
        reciept: {
          type: String,
          default: ""
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
