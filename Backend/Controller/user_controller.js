const express = require('express');
const bcrypt = require("bcrypt");
const nodemailer= require("nodemailer");

require('dotenv').config();

const router = express.Router();

const user = require('../Model/user')

router.get('/', function (req, res) {
    res.send("This is User Home Page....!!!")
});

//configure Email:
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD,
         },
    secure: true,
});

// create service for Email
router.post('/send_otp',async function (req, res) {

    try {
        const email = req.body.email;

        // Step 1: Check if user exists
        const userdetails = await user.findOne({ userid: email });
        if (!userdetails) {
            return res.status(404).json({ message: 'Email not registered' });
        }


        //send mail to the registered user
        const mailData = {
            from: process.env.EMAIL,  // sender address
            to: req.body.email ,   // list of receivers
            subject: 'OTP Notification',
            text: 'Online Food App',
            html: `
                    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
                        <h2 style="color: #ff6600;">Welcome to Online Food App!</h2>
                        
                        <p>Thank you for signing up with <strong>Online Food App</strong>.</p>
                        
                        <p>Your One-Time Password (OTP) for verification is:</p>
                        
                        <h3 style="background-color: #f8f8f8; color: #333; padding: 10px 20px; display: inline-block; border-radius: 6px; border: 1px dashed #ccc;">
                        ${req.body.otp}
                        </h3>
                        
                        <p>Please enter this OTP to complete your registration. This code is valid for the next 10 minutes.</p>
                        
                        <p>If you didn’t initiate this request, please ignore this email or contact our support team.</p>
                        
                        <br>
                        <p>Bon Appétit!<br>
                        <strong>– Online Food App Team</strong></p>
                    </div>
                    `
                ,
          };
      
          transporter.sendMail(mailData, function (err, info) {
              if(err)
                res.send({message: 'failed'})
              else
                res.send({message: 'success'});
           });

    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

// PATCH: Update user password by email
router.patch('/updatePassword', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ message: 'Email and new password are required.' });
        }

        // Find the user by email
        const userdata = await user.findOne({ userid: email });

        if (!userdata) {
            return res.status(404).json({ message: 'Email ID does not exist.' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update only the password
        userdata.password = hashedPassword;
        await userdata.save();

        res.status(200).json({
            message: 'Password updated successfully.',
            user: userdata
        });

    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: error.message });
    }
});

//Post Method
router.post('/addUser', async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    
    const data = new user({
        "userid": req.body.userid,
        "name": req.body.name,
        "password": hash,
        "contact": req.body.contact
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// compare password
async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

//Post Method
router.post('/loginUser', async (req, res) => {
    const userid = req.body.userid
    const password = req.body.password
    try{
        const data = await user.find({userid: userid});
        if(data.length>0){
            if(await comparePassword(password, data[0].password)){
                res.json(data);
            }
            else{
                res.status(500).json({message:"password not valid"})
            }
        }
        else{
            res.status(500).json({message:"user not found"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all Method
router.get('/getAllUsers', async (req, res) => {
    try{
        const data = await user.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getUserById/:id', async(req, res) => {
    try{
        const data = await user.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await user.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/deleteUser/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await user.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router