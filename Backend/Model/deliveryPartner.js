const mongoose = require('mongoose');

const DeliveryPartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vehicleNumber: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  currentLocation: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    updatedAt: { type: Date, default: null }
  }
}, { timestamps: true });

module.exports = mongoose.model('DeliveryPartner', DeliveryPartnerSchema);
