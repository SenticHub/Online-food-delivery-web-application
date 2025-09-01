// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   cartItems: [
//     {
//       food: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Food',
//         required: true
//       },
//       quantity: {
//         type:  Number,
//         required: true,
//         min: 1
//       },
//       totalPrice: {
//         type:  Number,
//         required: true
//       }
//     }
//   ],
//   transactionId:{
//     type:String,
//     required: true
//   },
//   summary: {
//     totalItems: {
//       type: Number,
//       required: true
//     },
//     totalQuantity: {
//       type: Number,
//       required: true
//     },
//     totalAmount: {
//       type: Number,
//       required: true
//     }
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('ProductOrder', orderSchema);
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cartItems: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      totalPrice: {
        type: Number,
        required: true
      }
    }
  ],
  transactionId: {
    type: String,
    required: true
  },
  summary: {
    totalItems: { type: Number, required: true },
    totalQuantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
  },

  // New fields for delivery flow
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'PICKED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryPartner',
    default: null
  },
  driverLocation: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    updatedAt: { type: Date, default: null }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProductOrder', orderSchema);
