const express = require('express');
const router = express.Router();
const Food = require('../Model/food');

// Home route for Food
router.get('/', (req, res) => {
    res.send("This is Food Home Page....!!!");
});

// Add Food (POST Method)
router.post('/addFood', async (req, res) => {
    const data = new Food({
        foodname: req.body.foodname,
        price: req.body.price,
        category: req.body.category,
        //description: req.body.description || "",
        availability: req.body.availability,
        image: req.body.image,
        image_id: req.body.image_id,
    });
   
    try {
        const dataToSave = await data.save();
        //console.log("24", dataToSave)
        res.status(200).json(dataToSave);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get All Foods (GET Method)
router.get('/getAllFoods', async (req, res) => {
    try {
        const data = await Food.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/searchFood/:keyword', async (req, res) => {
    try {
        const data = await Food.find({
            foodname: { $regex: req.params.keyword, $options: 'i' } // 'i' = ignore case
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Get All Foods (GET Method)
router.get('/getAllFoodsByCategory/:id', async (req, res) => {
    try {
        const data = await Food.find({category:req.params.id});
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Food by ID (GET Method)
router.get('/getFoodById/:id', async (req, res) => {
    try {
        const data = await Food.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Food by ID (PATCH Method)
router.patch('/updateFood/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Food.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Food by ID (DELETE Method)
router.delete('/deleteFood/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Food.findByIdAndDelete(id);
        res.send(`Food item with name "${data.foodname}" has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
