import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from './CartContext'; // Adjust path as needed
const url = import.meta.env.VITE_BASE_URL;
const Navbar = () => {
  const [flag, setFlag] = useState(0)
  const [name, setName] = useState("")

  const { cartCount, getCartCount } = useCart(); // Use cart context

  const getusers = async (userid) =>{
    const response = await fetch(`${url}/user/getUserById/${userid}`)
    const data = await response.json()

    //console.log(12,data)
    setName(data.name)
}


  useEffect(() => {   
    if(localStorage.getItem('id'))
    {
      const userId = localStorage.getItem('id')
      getusers(userId)

      if (userId) {
        setFlag(1)
        getCartCount();
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('id')
    localStorage.removeItem('name')
    window.location.href = "/login"
  }


  return (
    <div>
      <div className="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s">
        <div className="top-bar row gx-0 align-items-center d-none d-lg-flex">
          <div className="col-lg-6 px-5 text-start">
            <small><i className="fa fa-map-marker-alt me-2" />123 Street, New York, USA</small>
            <small className="ms-4"><i className="fa fa-envelope me-2" />info@example.com</small>
          </div>
          <div className="col-lg-6 px-5 text-end">
            <small>Follow us:</small>
            <a className="text-body ms-3" href="#"><i className="fab fa-facebook-f" /></a>
            <a className="text-body ms-3" href="#"><i className="fab fa-twitter" /></a>
            <a className="text-body ms-3" href="#"><i className="fab fa-linkedin-in" /></a>
            <a className="text-body ms-3" href="#"><i className="fab fa-instagram" /></a>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
          <a href="index.html" className="navbar-brand ms-4 ms-lg-0">
            <h1 className="fw-bold text-primary m-0">F<span className="text-secondary">oo</span>dy</h1>
          </a>
          <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarCollapse">
            <div className="navbar-nav p-4 p-lg-0">
              <Link to="/" className="nav-item nav-link active">Home</Link>
              {/* <Link to="/about" className="nav-item nav-link">About Us</Link> */}
              <Link to="/product" className="nav-item nav-link">Products</Link>
              {/* <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                <div className="dropdown-menu m-0">
                  <a href="blog.html" className="dropdown-item">Blog Grid</a>
                  <a href="feature.html" className="dropdown-item">Our Features</a>
                  <a href="testimonial.html" className="dropdown-item">Testimonial</a>
                  <a href="404.html" className="dropdown-item">404 Page</a>
                </div>
              </div> */}
              
            </div>

            <div className="d-none d-lg-flex ms-2">
              {
                flag === 0 ? (
                  <Link to="/login" className="btn-sm-square bg-white rounded-circle ms-3">
                    <small className="fa fa-user text-body" />
                  </Link>
                ) : (
                  <>
                   <Link to="/cart" className="btn-sm-square bg-white rounded-circle ms-3" href="#">
                    <small className="fa fa-shopping-bag text-body" /><sup>{cartCount}</sup>
                  </Link>
                  <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{name}</a>
                    <div className="dropdown-menu m-0">
                      <Link to="/profile" className="dropdown-item">Profile</Link>
                      <a onClick={logout} className="dropdown-item" style={{ cursor: "pointer" }}>Log out</a>
                      <Link to="/order" className="dropdown-item">Order</Link>
                    </div>
                  </div>
                  </>
                )
              }
             
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar