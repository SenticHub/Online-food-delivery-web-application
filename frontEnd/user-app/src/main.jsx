import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Demo from './Demo.jsx'
import Home from './Home.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Demo></Demo> */}
    {/* <Home></Home> */}
  </StrictMode>,
)
