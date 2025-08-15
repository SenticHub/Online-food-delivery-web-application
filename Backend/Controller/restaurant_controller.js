const express = require('express');

const router = express.Router();

const resturant = require('../Model/resturant')

router.get('/', function (req, res) {
    res.send("This is Resturant Home Page....!!!")
});
router.post('/addResturant',async(req,res)=>{
    const data=new resturant({
        "email":req.body.email,
        "name":req.body.name,
        "password":req.body.password,
        "contact":req.body.contact,
        "address":req.body.address,
        "timing":req.body.timing,
        "status":req.body.status,
    })
    try{
        const dataToSave=await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})

//Post Method
router.post('/loginResturant', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try{
        const data = await resturant.find({email: email, password: password});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method
router.get('/getAllResturant', async (req, res) => {
    try{
        const data = await resturant.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getResturantById/:id', async(req, res) => {
    try{
        const data = await resturant.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


router.patch('/updateRasturant/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await resturant.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/deleteResturant/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await resturant.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router