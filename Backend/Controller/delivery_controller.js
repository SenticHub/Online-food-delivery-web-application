const express = require('express');
const router = express.Router();
const Order = require('../Model/order');
const DeliveryPartner = require('../Model/deliveryPartner');

// ----------------- Helper for status flow -----------------
const canMoveTo = (current, next) => {
  const flow = {
    PENDING: ['ACCEPTED'],
    ACCEPTED: ['PICKED', 'CANCELLED'],
    PICKED: ['OUT_FOR_DELIVERY', 'CANCELLED'],
    OUT_FOR_DELIVERY: ['DELIVERED', 'CANCELLED'],
    DELIVERED: [],
    CANCELLED: []
  };
  return flow[current]?.includes(next);
};



// Register new delivery boy
router.post('/register', async (req, res) => {
  try {
    const { name, phone, password, vehicleNumber } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ msg: 'Name, phone, and password are required' });
    }

    // check if phone already exists
    const exists = await DeliveryPartner.findOne({ phone });
    if (exists) return res.status(409).json({ msg: 'Phone already registered' });

    const dp = await DeliveryPartner.create({
      name,
      phone,
      password,   
      vehicleNumber
    });

    res.json({ success: true, deliveryId: dp._id, name: dp.name, phone: dp.phone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Registration failed' });
  }
});

// Login delivery boy
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ msg: 'Phone and password are required' });
    }

    const dp = await DeliveryPartner.findOne({ phone, password });
    if (!dp) return res.status(401).json({ msg: 'Invalid phone or password' });

    res.json({ success: true, deliveryId: dp._id, name: dp.name, phone: dp.phone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Login failed' });
  }
});

// ----------------- ORDERS -----------------

// Accept order
router.post('/orders/:orderId/accept', async (req, res) => {
  try {
    const { deliveryId } = req.body;
    const { orderId } = req.params;

    if (!deliveryId) return res.status(400).json({ msg: 'deliveryId is required' });

    const updated = await Order.findOneAndUpdate(
      { _id: orderId, status: 'PENDING' },
      { $set: { status: 'ACCEPTED', deliveryPartner: deliveryId } },
      { new: true }
    );

    if (!updated) return res.status(409).json({ msg: 'Already accepted or not found' });

    // Emit socket event
    const io = req.app.get('io');
    io.emit('order_accepted', updated);

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Accept failed' });
  }
});

// Update order status
router.patch('/orders/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    if (!canMoveTo(order.status, status)) {
      return res.status(400).json({ msg: `Cannot move from ${order.status} to ${status}` });
    }

    order.status = status;
    await order.save();

    // Emit socket event
    const io = req.app.get('io');
    io.emit('order_status_changed', order);

    res.json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Status update failed' });
  }
});

// Get pending orders
router.get('/orders/pending', async (_req, res) => {
  try {
    const orders = await Order.find({ status: 'PENDING' }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Fetch pending failed' });
  }
});

// Get driver’s active orders
router.get('/orders/my', async (req, res) => {
  try {
    const { deliveryId } = req.query;
    if (!deliveryId) return res.status(400).json({ msg: 'deliveryId is required' });

    const orders = await Order.find({
      deliveryPartner: deliveryId,
      status: { $in: ['ACCEPTED', 'PICKED', 'OUT_FOR_DELIVERY'] }
    }).sort({ updatedAt: -1 });

    res.json({ success: true, data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Fetch my orders failed' });
  }
});

// Update driver location
router.patch('/location', async (req, res) => {
  try {
    const { deliveryId, lat, lng, orderId } = req.body;
    if (!deliveryId || lat == null || lng == null) {
      return res.status(400).json({ msg: 'deliveryId, lat, lng are required' });
    }

    await DeliveryPartner.findByIdAndUpdate(deliveryId, {
      $set: { currentLocation: { lat, lng, updatedAt: new Date() } }
    });

    if (orderId) {
      await Order.findByIdAndUpdate(orderId, {
        $set: { driverLocation: { lat, lng, updatedAt: new Date() } }
      });

      // Emit driver location update
      const io = req.app.get('io');
      io.emit('driver_location_updated', { orderId, lat, lng });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Location update failed' });
  }
});

module.exports = router;
