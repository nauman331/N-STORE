const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
      
            console.log("Connected to database successfully!")
        
    } catch (error) {
        console.log("Error in connecting to database", error)
    }
}


module.exports = connectDB;
