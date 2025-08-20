require('dotenv').config();
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

// app.use(cors({
//     origin:'*'
// }))
app.use(cors({
  origin: [
    "https://online-food-delivery-web-application-hi10.onrender.com",  // admin
    "https://online-food-delivery-web-application-user.onrender.com"   // user
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));
const cart_controller = require('./Controller/cart_controller')
app.use('/cart', cart_controller)

const category_controller = require('./Controller/category_controller')
app.use('/category', category_controller)

const user_controller = require('./Controller/user_controller')
app.use('/user', user_controller)

const restaurant_controller=require('./Controller/restaurant_controller')
app.use('/resturant', restaurant_controller)


const food_controller=require('./Controller/food_Controller')
app.use('/food', food_controller)

const order_controller=require('./Controller/order_controller')
app.use('/order',order_controller)

app.get('/', function (req, res) {
    res.send("This is Home Page....!!!")
});

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})
