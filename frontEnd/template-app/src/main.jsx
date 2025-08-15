import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Demo from './Demo.jsx'
import Signin from './Signin.jsx'
import DashBoard from './DashBoard.jsx'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Demo></Demo> */}
    {/* <Signin></Signin> */}
    {/* <DashBoard></DashBoard> */}
    <Home></Home>
  
  </StrictMode>,
)
