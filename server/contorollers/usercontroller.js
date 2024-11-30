const userModel = require("../models/usermodel");
const generateAccessToken = require("../helpers/generateAccessToken");
const bcrypt = require("bcrypt");
const productModel = require("../models/productModel");
const carouselModel = require("../models/carouselModel");
const cloudinary = require("../helpers/cloudinaryConfig");
const fs = require("fs");

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
    const { total, tId } = req.body;

    if (!total || !tId) {
      return res.status(400).json({
        message: "Error while fetching data. Missing required fields: total, paid, or transaction ID.",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a screenshot as payment proof." });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(400).json({ message: "User not found. Please log in again." });
    }

    if (user.cart.length === 0) {
      return res.status(400).json({ message: "Your cart is empty, please add something to cart." });
    }

    // Upload the payment proof if present
    let proofpic = null;
    if (req.file) {
      const cloudinaryUploadResponse = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "auto",
      });
      proofpic = cloudinaryUploadResponse.url;
    }

    // Calculate paid amount (5% of total)
    const paid = total * 5 / 100;

    // Create new order with multiple products
    const newOrder = {
      products: user.cart.map(item => item.product), // Push all product references from the cart
      total,
      paid,
      proofpic,
      tId,
      status: "Approving",
    };

    // Push the new order to the user's orders array
    user.orders.push(newOrder);
    user.cart = []; // Clear the cart after creating the order

    await user.save();

    return res.status(201).json({ message: "Checkout successful, awaiting payment verification" });

  } catch (error) {
    console.error(error);
    if (req.file) fs.unlinkSync(req.file.path);
    return res.status(500).json({
      message: "Error while processing the checkout. Please try again!",
    });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
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
