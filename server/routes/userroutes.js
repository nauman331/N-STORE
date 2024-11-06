const express = require('express');
const router = express.Router();
const authController= require('../contorollers/usercontroller')
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/getproducts', authController.getProducts)
router.get('/userdata', authenticateToken, authController.userdata)

module.exports = router;