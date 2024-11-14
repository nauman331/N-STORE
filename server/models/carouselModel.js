const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
    carouselImage : {
        type: String,
        required: true
    },
})

const CarouselSchema = new mongoose.model("Carousel", carouselSchema);
module.exports = CarouselSchema;