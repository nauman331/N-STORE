const cloudinary = require("../helpers/cloudinaryConfig");
const fs = require("fs");
const productModel = require("../models/productModel");
const carouselModel = require("../models/carouselModel")

const createProduct = async (req, res) => {
    try {
        const { title, category, price, discountedprice, stock } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        if (!title || !category || !price || !stock) {
            return res.status(400).json({ message: 'Fill all the fields properly' });
        }

        // Validate price and stock
        if (isNaN(price) || isNaN(stock)) {
            return res.status(400).json({ message: "Prices and stock should be valid numbers" });
        }

        if (discountedprice && isNaN(discountedprice)) {
            return res.status(400).json({ message: "Discounted price should be a valid number" });
        }
        if (discountedprice && discountedprice > price) {
            return res.status(400).json({ message: "Discounted Price should be less than original price" });
        }

        const cloudinaryUploadResponse = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        const { secure_url: image, cloudinaryId: public_id } = cloudinaryUploadResponse;

        await productModel.create({
            title,
            category,
            price,
            discountedprice,
            stock,
            image,
            public_id,
        });

        res.status(200).json({ message: "Product uploaded successfully" });
    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        console.error("Error in uploading product:", error);
        res.status(400).json({ message: "Error in uploading new product", error });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
};

const addCarosel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file selected' });
        }
        const cloudinaryUploadResponse = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        const {secure_url: carouselImage, cloudinaryId: public_id} = cloudinaryUploadResponse;

        await carouselModel.create({
            carouselImage,
            public_id
        })
        res.status(200).json({message: "Carousel Image Uploaded Successfully!"})

    } catch (error) {
        return res.status(400).json({message: "Error occured while uploading", error})
    } finally {
     
        if (req.file) fs.unlinkSync(req.file.path);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Error in getting the required product" });
        }

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete image from Cloudinary
        if (product.cloudinaryId) {
            await cloudinary.uploader.destroy(product.cloudinaryId);
        }

        await productModel.deleteOne({ _id: id });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error in deleting product", error: error.message });
    }
};


const deleteCarousel = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Error in getting the required carousel" });
        }

        const carousel = await carouselModel.findById(id);
        if (!carousel) {
            return res.status(404).json({ message: "Carousel not found" });
        }

        // Delete image from Cloudinary
        if (carousel.cloudinaryId) {
            await cloudinary.uploader.destroy(carousel.cloudinaryId);
        }

        await carouselModel.deleteOne({ _id: id });
        res.status(200).json({ message: "Carousel deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in deleting carousel", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { title, category, price, discountedprice, stock, id } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Check if at least one field is provided for updating
        if (!title && !category && !price && !stock && !discountedprice) {
            return res.status(400).json({ message: 'At least one field is required to update' });
        }

        // Create an object to store fields that need to be updated
        const updateFields = {};

        // Conditionally add fields to updateFields object
        if (title) updateFields.title = title;
        if (category) updateFields.category = category;
        if (price) updateFields.price = price;
        if (discountedprice) updateFields.discountedprice = discountedprice;
        if (stock) updateFields.stock = stock;

       

           await productModel.findByIdAndUpdate(
            id,
            updateFields,  // Only pass the fields that are updated
            { new: true }  // Return the updated product
        );

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error in updating product", error: error.message });
    }
};





module.exports = { createProduct, deleteProduct, addCarosel, deleteCarousel, updateProduct };
