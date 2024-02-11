const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        page:{
            type: String,
        },
        priceCategory: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        id:{
            type: Number,
            required: true
        }
    }, {collection: "restaurant"}
)

const Restaurant = mongoose.model("Restaurant", restaurantSchema)

module.exports = Restaurant