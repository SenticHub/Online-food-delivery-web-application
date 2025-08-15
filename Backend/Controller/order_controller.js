const express = require('express');
const router = express.Router();
const Order = require('../Model/order');
const Food = require('../Model/food');
const CartSchema = require('../Model/cart');

router.get('/', (req, res) => {
    res.send("This is Order Page....!!!");
});


// POST /addOrder
router.post('/addOrder', async (req, res) => {
  try {
    const { userId, cartItems, summary, transactionId } = req.body;

    console.log("Backend 16: "+req.body)

    // Validate inputs
    if (!userId || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'userId and cartItems are required' });
    }

    // Check if user already has an order
    // const existingOrders = await Order.find({ userId });
    // if (existingOrders.length > 0) {
    //   return res.status(200).json({ message: 'Already ordered' });
    // }

    // Prepare summary
    // let totalAmount = 0;
    // let totalQuantity = 0;

    // for (const item of cartItems) {
    //   const food = await Food.findById(item.foodId);
    //   if (!food || !food.availability) {
    //     return res.status(404).json({ message: `Food item not found or unavailable: ${item.foodId}` });
    //   }
    //   totalAmount += food.price * item.quantity;
    //   totalQuantity += item.quantity;
    // }

  
    // Save the order
    const newOrder = new Order({
      userId,
      cartItems,
      summary, 
      transactionId
    });

    const savedOrder = await newOrder.save();

    if(savedOrder._id!=null)
    {
      await CartSchema.deleteMany({ userid: userId})
      res.status(200).json({ success: true, data: savedOrder });
    }
    else{
      res.status(500).json({ message: 'Something wrong, Order not placed, try later...!!!' });
    }
    

  } catch (error) {
    console.error('Error in /addOrder:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET /order/getOrdersByUser/:userId
router.get('/getOrdersByUser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId }).populate('cartItems.food');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

//  Admin route: get ALL orders from all users
router.get('/getAllOrders', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('cartItems.food')
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;



