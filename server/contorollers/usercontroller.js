const userModel = require("../models/usermodel")
const generateAccessToken = require('../helpers/generateAccessToken');
const bcrypt = require("bcrypt")


const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({msg: "Fill all the fields properly"})
    }
    const existingemail = await userModel.findOne({ email });
    if(existingemail){
        return res.status(400).json({msg:"Email is already registerd!"});
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = await userModel.create({
        username,
        email,
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
          userId: existingEmail._id.toString(),
          token: generateAccessToken(existingEmail),
        });
      } else {
        return res.status(400).json({ msg: "Wrong email or password" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error occurred while logging in", error });
    }
  };

 
  const user = async (req, res, next) => {
    try {
        const userData = req.user;
        return res.status(200).json({ userData })
    } catch (error) {
        next(error)
    }
}




module.exports = {register, login, user}