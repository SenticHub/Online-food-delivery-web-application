const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userid: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    contact: {
        required: true,
        type: String
    },
    currentLocation: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    updatedAt: { type: Date, default: null }
  }
})

module.exports = mongoose.model('User', dataSchema)