const cloudinary = require("../helpers/cloudinaryConfig");
const fs = require("fs");
const productModel = require("../models/productModel");
const carouselModel = require("../models/carouselModel")

const createProduct = async (req, res) => {
    try {
        const { title, category, price, discountedprice } = req.body;

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        // Check if required fields are present
        if (!title || !category || !price) {
            return res.status(400).json({ msg: 'Fill all the fields properly' });
        }

        
        // Upload to Cloudinary
        const cloudinaryUploadResponse = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto"
        });
        
        const imgURL = cloudinaryUploadResponse.url;

         await productModel.create({
            title,
            category,
            price,
            discountedprice,
            image: imgURL
        });

        // Send success response
        res.status(200).json({ msg: "Product uploaded successfully" });
    } catch (error) {
        console.error("Error in uploading product:", error);
        res.status(400).json({ msg: "Error in uploading new product", error });
    } finally {
        // Delete file from server after upload attempt
        if (req.file) fs.unlinkSync(req.file.path);
    }
};


const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({products});
    
  } catch (error) {
    res.status(400).json({msg: "Error in getting all products"})
  }
}

const addCarosel = async (req, res) => {
    try {
        const {link} = req.body
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
        const cloudinaryUploadResponse = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        const carouselImage = cloudinaryUploadResponse.url;

        await carouselModel.create({
            carouselImage,
            link
        })
        res.status(200).json({msg: "Carousel Image Uploaded Successfully!"})

    } catch (error) {
        return res.status(400).json({msg: "Error occured while uploading", error})
    } finally {
        // Delete file from server after upload attempt
        if (req.file) fs.unlinkSync(req.file.path);
    }
}

const getCarousel = async (req, res) => {
    try {
      const carousel = await carouselModel.find();
      res.status(200).json({carousel});
      
    } catch (error) {
      res.status(400).json({msg: "Error in getting Carousel Images"})
    }
  }

module.exports = { createProduct, getProducts, addCarosel, getCarousel };
