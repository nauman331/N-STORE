const express = require("express");
const router = express.Router();
const authController = require("../contorollers/usercontroller");
const authenticateToken = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/fileUploadMiddleware");
const validate = require("../middlewares/validateMiddleware");
const loginSchema = require("../validators/login-validator");
const signupSchema = require("../validators/register-validator");


router.post("/register", validate(signupSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/getproducts", authController.getProducts);
router.get("/getcarousel", authController.getCarousel);
router.get("/userdata", authenticateToken, authController.userdata);
router.put(
  "/updateprofile",
  authenticateToken,
  uploadMiddleware.single("profile"),
  authController.updateProfile
);
router.put("/addtocart", authenticateToken, authController.addToCart);
router.post(
  "/removefromcart",
  authenticateToken,
  authController.removeFromCart
);
router.get("/getcart", authenticateToken, authController.getCart);
router.get("/getorders", authenticateToken, authController.getOrders);
router.post(
  "/checkout",
  authenticateToken,
  uploadMiddleware.single("proofpic"),
  authController.checkout
);

module.exports = router;
