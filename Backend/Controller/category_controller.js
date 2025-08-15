const express = require('express');
const router = express.Router();
const Category = require('../Model/category');

// Home route for Food
router.get('/', (req, res) => {
    res.send("This is category Home Page....!!!");
});

// Add Food (POST Method)
router.post('/addCategory', async (req, res) => {
    const data = new Category({
        // foodname: req.body.foodname,
        // price: req.body.price,
        category: req.body.category,
        //description: req.body.description || "",
        // availability: req.body.availability,
        // image: req.body.image,
        // image_id: req.body.image_id,
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
router.get('/getAllCategory', async (req, res) => {
    try {
        const data = await Category.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Food by ID (GET Method)
router.get('/getCategoryById/:id', async (req, res) => {
    try {
        const data = await Category.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Food by ID (PATCH Method)
router.patch('/updateCategory/:id', async (req, res) => {
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
router.delete('/deleteCategory/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Category.findByIdAndDelete(id);
        res.send(`Category with name "${data.category}" has been deleted.`);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;