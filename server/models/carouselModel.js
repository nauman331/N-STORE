const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
    carouselImage : {
        type: String,
        required: true
    },
    cloudinaryId : {
        type: String
    }
})

const CarouselSchema = new mongoose.model("Carousel", carouselSchema);
module.exports = CarouselSchema;