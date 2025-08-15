const express = require('express');
const router = express.Router();
const Cart = require('../Model/cart');
const User = require('../Model/user');
const Food = require('../Model/food');
const mongoose = require('mongoose');
// Home route for Food
router.get('/', (req, res) => {
    res.send("This is Cart Page....!!!");
});



// Add Food (POST Method)
router.post('/addCart', async (req, res) => {
  
    const existingCartItems = await Cart.find({
        userid: req.body.userid,
        foodid: req.body.foodid
    });
    if(existingCartItems.length>0){
        res.status(200).json({ message: "already in cart" });
    }else{
        const data = new Cart({
        foodid: req.body.foodid,
        quantity: req.body.quantity,
        userid: req.body.userid,
        
    });
    try {
        const dataToSave = await data.save();
        //console.log("24", dataToSave)
        res.status(200).json(dataToSave);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    }  
});


// router.get('/getAllFoods', async (req, res) => {
//     try {
//         const data = await Cart.find();
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.get('/searchFood/:keyword', async (req, res) => {
//     try {
//         const data = await Food.find({
//             foodname: { $regex: req.params.keyword, $options: 'i' } // 'i' = ignore case
//         });
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });



// Get All Foods (GET Method)
router.get('/getAllFoodsByCategory/:id', async (req, res) => {
    try {
        const data = await Food.find({category:req.params.id});
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/getCartByUser/:id', async (req, res) => {
    try {
        const userid = req.params.id;
        
        // Explicitly reference the models by their registered names
        const User = mongoose.model('User');
        const Cart = mongoose.model('Cart');
        const Food = mongoose.model('Food');
        
        // First get the user details
        const user = await User.findById(userid).select('-password'); // Exclude password from results
        
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Find all cart items for this user
        const cartItems = await Cart.find({ userid });
        
        if (cartItems.length === 0) {
            return res.json({
                success: true,
                message: 'Cart is empty',
                data: {
                    user,
                    cartItems: []
                }
            });
        }

        // Get all food IDs from cart
        const foodIds = cartItems.map(item => item.foodid);
        
        // Get all food details in a single query - using lean() for better performance
        const foodDetails = await Food.find({ _id: { $in: foodIds } })
            .lean(); // Don't need populate here since we'll handle category display manually
        
        // Create a map of food details for quick lookup
        const foodMap = {};
        foodDetails.forEach(food => {
            foodMap[food._id.toString()] = food;
        });
        
        // Combine cart items with food details
        const detailedCartItems = cartItems.map(cartItem => {
            const food = foodMap[cartItem.foodid.toString()];
            return {
                _id: cartItem._id,
                quantity: cartItem.quantity,
                food: food ? {
                    _id: food._id,
                    foodname: food.foodname,
                    price: food.price,
                    availability: food.availability,
                    image: food.image,
                    category: food.category // Just pass the category ID for now
                } : null,
                totalPrice: food ? food.price * cartItem.quantity : 0
            };
        });
        
        // Calculate cart summary
        const cartSummary = {
            totalItems: detailedCartItems.length,
            totalQuantity: detailedCartItems.reduce((sum, item) => sum + item.quantity, 0),
            totalAmount: detailedCartItems.reduce((sum, item) => sum + item.totalPrice, 0)
        };

        // Send the response
        return res.status(200).json({
            success: true,
            data: {
                user,
                cartItems: detailedCartItems,
                summary: cartSummary
            }
        });
        
    } catch (error) {
        console.error('Error fetching cart details:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch cart details',
            error: error.message
        });
    }
});
// Get Food by ID (GET Method)
// router.get('/getFoodById/:id', async (req, res) => {
//     try {
//         const data = await Food.findById(req.params.id);
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// Update Food by ID (PATCH Method)
router.patch('/updateCart/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Cart.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Food by ID (DELETE Method)
router.delete('/deleteCart/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Cart.findByIdAndDelete(id);
        res.send({"message": `Food item with name "${data._id}" has been deleted.`});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// API endpoint: GET /userdata/:userid
router.get('/userdata/:userid', async (req, res) => {
    try {
        const userId = req.params.userid;

        // Get user data
        const user = await User.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get cart items for user, populate food details
        const cartItems = await Cart.find({ userid: userId })
                                    .populate('foodid')
                                    .lean();

        res.json({
            user: user,
            cart: cartItems
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
