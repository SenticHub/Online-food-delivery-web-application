import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Navbar'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import Feature from './Feature'
import Product from './Product'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Login from './Login'
import Registration from './Registration'
import Cart from './Cart'

import { CartProvider } from './CartContext'
import ForgetPassword from './ForgotPassword'
import Order from './Order'
import OrderDetails from './OrderDetails'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CartProvider>
      <Router>
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/about" element={<About></About>}></Route>
      <Route path="/feature" element={<Feature></Feature>}></Route>
      <Route path="/product" element={<Product></Product>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/registration" element={<Registration></Registration>}></Route>
      <Route path="/cart" element={<Cart></Cart>}></Route>
      <Route path="/profile" element={<Home></Home>}></Route>
      <Route path="/order" element={<Order></Order>}></Route>
      <Route path="/forgotPassword" element={<ForgetPassword></ForgetPassword>}></Route>
      <Route path="/orderDetails" element={<OrderDetails></OrderDetails>}></Route>
      </Routes>
  
      <Footer></Footer>
      </Router>
      </CartProvider>
    </>
  )
}

export default App
