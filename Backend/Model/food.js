const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodname: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    availability: {
        required: true,
        type: Boolean 
    },
    image: {
        type: String,
        requred: true
    },
    image_id: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    }
});

module.exports = mongoose.model('Food', foodSchema);
