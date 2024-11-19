const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/fileUploadMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware")
const adminController = require("../contorollers/admincontroller")


router.post("/newproduct",adminMiddleware, uploadMiddleware.single("productimage"), adminController.createProduct);
router.post("/newcarouselimage",adminMiddleware, uploadMiddleware.single("carouselimage"), adminController.addCarosel);
router.delete("/deleteproduct",adminMiddleware, adminController.deleteProduct);
router.delete("/deletecarousel",adminMiddleware, adminController.deleteCarousel);
router.put("/updateproduct",adminMiddleware, adminController.updateProduct);

module.exports = router;