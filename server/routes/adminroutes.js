const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/fileUploadMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware")
const adminController = require("../contorollers/admincontroller")


router.post("/newproduct",adminMiddleware, uploadMiddleware.single("image"), adminController.createProduct);
router.post("/getproducts",adminMiddleware, adminController.getProducts);

module.exports = router;