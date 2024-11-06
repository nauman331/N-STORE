const userModel = require("../models/usermodel")
const generateAccessToken = require('../helpers/generateAccessToken');
const bcrypt = require("bcrypt")
const productModel = require("../models/productModel")


const register = async (req, res) => {
    try {
        const {username, email, password, phone} = req.body;
    if (!username || !email || !password || !phone) {
        return res.status(400).json({msg: "Fill all the fields properly"})
    }
    const existingemail = await userModel.findOne({ email });
    const existingPhone = await userModel.findOne({ phone });
    if(existingemail){
        return res.status(400).json({msg:"Email is already registerd!"});
    }
    if(existingPhone){
      return res.status(400).json({msg:"Phone Number is already registerd!"});
  }
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await userModel.create({
        username,
        email,
        phone,
        password: hashedPassword
    })
    res.status(200).json({
        msg: 'user created successfully!',
    });


    } catch (error) {
        res.status(400).json({msg: "Error occured in registration!",
             error})
    }
    


}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ msg: "Fill all the fields properly" });
      }
  
      const existingEmail = await userModel.findOne({ email });
      if (!existingEmail) {
        return res.status(400).json({ msg: "Email is not registered!" });
      }
  
      const passwordMatch = await bcrypt.compare(password, existingEmail.password);
      if (passwordMatch) {
        return res.status(200).json({
          msg: "User logged in successfully",
          token: generateAccessToken(existingEmail),
        });
      } else {
        return res.status(400).json({ msg: "Wrong email or password" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error occurred while logging in", error });
    }
  };

 
 const userdata = async (req, res) => {
  try {

    res.status(200).json({userdata:req.user})
    
  } catch (error) {
    res.status(400).json({msg:"Can't access user data please login again"})
  }
 }

 const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({products});
    
  } catch (error) {
    res.status(400).json({msg: "Error in getting all products"})
  }
}


module.exports = {register, login, userdata, getProducts}