import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import{BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login';
import DriverApp from './Driverapp';
import DeliveryBoyRegistration from './DeliveryBoyRegistration';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to Delivery App</h1>}></Route>
        <Route path="/delivery" element={<Dashboard></Dashboard>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/driverapp" element={<DriverApp></DriverApp>}></Route>
        <Route path="/registration" element={<DeliveryBoyRegistration></DeliveryBoyRegistration>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
