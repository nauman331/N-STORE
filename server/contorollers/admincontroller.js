const cloudinary = require("../helpers/cloudinaryConfig");
const fs = require("fs");
const productModel = require("../models/productModel");
const carouselModel = require("../models/carouselModel")

const createProduct = async (req, res) => {
    try {
        const { title, category, price, discountedprice, stock } = req.body;

        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

        if (!title || !category || !price || !stock) {
            return res.status(400).json({ msg: 'Fill all the fields properly' });
        }

        // Validate price and stock
        if (isNaN(price) || isNaN(stock)) {
            return res.status(400).json({ msg: "Prices and stock should be valid numbers" });
        }

        if (discountedprice && isNaN(discountedprice)) {
            return res.status(400).json({ msg: "Discounted price should be a valid number" });
        }
        if(discountedprice && discountedprice > price){
            return res.status(400).json({msg: "Discounted Price should be less than original price"})
        }
        const cloudinaryUploadResponse = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        const imgURL = cloudinaryUploadResponse.url;

        await productModel.create({
            title,
            category,
            price,
            discountedprice,
            stock,
            image: imgURL
        });

        res.status(200).json({ msg: "Product uploaded successfully" });
    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        console.error("Error in uploading product:", error);
        res.status(400).json({ msg: "Error in uploading new product", error });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
};



const addCarosel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
        const cloudinaryUploadResponse = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto"
        });

        const carouselImage = cloudinaryUploadResponse.url;

        await carouselModel.create({
            carouselImage,
        })
        res.status(200).json({msg: "Carousel Image Uploaded Successfully!"})

    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        return res.status(400).json({msg: "Error occured while uploading", error})
    } finally {
     
        if (req.file) fs.unlinkSync(req.file.path);
    }
}

const deleteProduct = async (req, res) => {
    try {
      const {id} = req.body;
          if(!id) {return res.status(400).json({msg: "Error in getting the required product"})};
      await productModel.deleteOne({_id: id});
      res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
      res.status(400).json({msg: "Error in getting all products", error: error.message})
    }
  }

const deleteCarousel = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ msg: "Error in getting the required carousel" });
        }
        await carouselModel.deleteOne({ _id: id });
        res.status(200).json({ msg: "Carousel deleted successfully" });
    } catch (error) {
        console.error(error);  
        res.status(500).json({ msg: "Error in deleting Carousel Images", error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { title, category, price, discountedprice, stock, id } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Check if at least one field is provided for updating
        if (!title && !category && !price && !stock && !discountedprice && !req.file) {
            return res.status(400).json({ msg: 'At least one field is required to update' });
        }

        // Create an object to store fields that need to be updated
        const updateFields = {};

        // Conditionally add fields to updateFields object
        if (title) updateFields.title = title;
        if (category) updateFields.category = category;
        if (price) updateFields.price = price;
        if (discountedprice) updateFields.discountedprice = discountedprice;
        if (stock) updateFields.stock = stock;

       

        // Update the product in the database
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updateFields,  // Only pass the fields that are updated
            { new: true }  // Return the updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({ msg: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error in updating product", error: error.message });
    }
};





module.exports = { createProduct, deleteProduct, addCarosel, deleteCarousel, updateProduct };
