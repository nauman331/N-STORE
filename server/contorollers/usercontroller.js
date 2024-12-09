const userModel = require("../models/usermodel");
const generateAccessToken = require("../helpers/generateAccessToken");
const bcrypt = require("bcrypt");
const productModel = require("../models/productModel");
const carouselModel = require("../models/carouselModel");
const cloudinary = require("../helpers/cloudinaryConfig");
const fs = require("fs");
const {v4: uuidv4} = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET)

const register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    if (!username || !email || !password || !phone) {
      return res.status(400).json({ message: "Fill all the fields properly" });
    }
    const existingemail = await userModel.findOne({ email });
    const existingPhone = await userModel.findOne({ phone });
    if (existingemail) {
      return res.status(400).json({ message: "Email is already registerd!" });
    }
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Phone Number is already registerd!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await userModel.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "user created successfully!",
    });
  } catch (error) {
    res.status(400).json({ message: "Error occured in registration!", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the fields properly" });
    }

    const existingEmail = await userModel.findOne({ email });
    if (!existingEmail) {
      return res.status(400).json({ message: "Email is not registered!" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      existingEmail.password
    );
    if (passwordMatch) {
      return res.status(200).json({
        message: "User logged in successfully",
        token: generateAccessToken(existingEmail),
      });
    } else {
      return res.status(400).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error occurred while logging in", error });
  }
};

const userdata = async (req, res) => {
  try {
    res.status(200).json({ userdata: req.user });
  } catch (error) {
    res.status(400).json({ message: "Can't access user data please login again" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ message: "Error in getting all products" });
  }
};

const getCarousel = async (req, res) => {
  try {
    const carousel = await carouselModel.find();
    res.status(200).json({ carousel });
  } catch (error) {
    res.status(400).json({ message: "Error in getting Carousel Images" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found!" });
    }

    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found Please Log In again!" });
    }

    // Check if the product is already in the cart
    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingCartItem) {
      // If product exists, update the quantity
      existingCartItem.quantity += quantity;
    } else {
      // If product does not exist, add it to the cart
      user.cart.push({
        product: productId,
        quantity,
      });
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error in Adding to Cart", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Find the user by ID
    const user = await userModel.findById(req.user._id);

    // Check if the user exists
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found. Please log in again!" });
    }

    // Find the product in the cart
    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === productId
    );

    // Check if the product exists in the cart
    if (!existingCartItem) {
      return res.status(400).json({ message: "Product is not in the cart" });
    }

    // Remove the product from the cart
    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId
    );

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error in removing item from cart", error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate("cart.product");
    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not Found Please Log In again!" });
    }
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(400).json({ message: "Error in getting cart items" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, email, address, phone } = req.body;
    if (!username && !email && !address && !phone && !req.file) {
      return res.status(400).json({ message: "At least one field is required" });
    }
    const existingemail = await userModel.findOne({ email });
    const existingPhone = await userModel.findOne({ phone });
    if (existingemail) {
      return res.status(400).json({ message: "Email is already registerd!" });
    }
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Phone Number is already registerd!" });
    }
    let updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (address) updateData.address = address;
    if (phone) updateData.phone = phone;

    if (req.file) {
      const cloudinaryUploadResponse = await cloudinary.uploader.upload(
        req.file.path,
        {
          resource_type: "auto",
        }
      );
      updateData.profile = cloudinaryUploadResponse.url;
    }
    await userModel.findByIdAndUpdate(req.user._id, updateData, { new: true });

    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(400).json({ message: "Error While updating Profile" });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
};

const checkout = async (req, res) => {
  try {
    const { total, token } = req.body;

    if (!total) {
      return res.status(400).json({ message: "Total not provided" });
    }
    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create(
      {
        amount: total * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
      },
      { idempotencyKey: uuidv4() }
    );

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (charge.status !== "succeeded") {
      return res.status(400).json({ message: "Error during checkout" });
    }

    console.log(charge.receipt_url)
    user.orders.push({
      products: user.cart.map((item) => item.product),
      total,
      reciept: charge.receipt_url
    });

    // Clear the cart after successful order
    user.cart = [];
    await user.save();

    res.status(201).json({ message: "Payment successful", charge });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment processing error" });
  }
};



const getOrders = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user._id)
      .populate({
        path: "orders.products",  
        model: "Product",          
      });

    if (!user) {
      return res.status(400).json({ message: "User Not Found. Please Log In again!" });
    }

    res.status(200).json({ orders: user.orders });
  } catch (error) {
    res.status(400).json({ message: "Error in getting ordered items" });
  }
};




module.exports = {
  register,
  login,
  userdata,
  getProducts,
  getCarousel,
  addToCart,
  removeFromCart,
  getCart,
  updateProfile,
  checkout,
  getOrders
};
