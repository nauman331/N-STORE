const express = require('express');
const router = express.Router();
const authController= require('../contorollers/usercontroller')
const authenticateToken = require('../middlewares/authMiddleware');
const uploadMiddleware = require("../middlewares/fileUploadMiddleware")

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/getproducts', authController.getProducts)
router.get('/getcarousel', authController.getCarousel)
router.get('/userdata', authenticateToken, authController.userdata)
router.put('/updateprofile', authenticateToken, uploadMiddleware.single("profile"), authController.updateProfile)
router.put('/addtocart', authenticateToken, authController.addToCart)
router.post('/removefromcart', authenticateToken, authController.removeFromCart)
router.get('/getcart', authenticateToken, authController.getCart)

module.exports = router;