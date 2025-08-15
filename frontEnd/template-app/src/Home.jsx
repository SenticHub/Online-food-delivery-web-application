import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";
import DashBoard from './DashBoard';
import AddCategory from './AddCategory';
import ManageCategory from './ManageCategory';
import ManageProducts from './ManageProducts';
import AddProducts from './AddProducts';
import EditCategory from './EditCategory';
import AdminOrders from './AdminOrders';
import AdminOrderDetails from './AdminOrderDetails';

const Home = () => {
  return (
     <Router>
    <div className="container-fluid position-relative d-flex p-0">
  
  {/* Sidebar Start */}
  <div className="sidebar pe-4 pb-3">
    <nav className="navbar bg-secondary navbar-dark">
      <a href="index.html" className="navbar-brand mx-4 mb-3">
        <h3 className="text-primary"><i className="fa fa-user-edit me-2" />DarkPan</h3>
      </a>
      <div className="d-flex align-items-center ms-4 mb-4">
        <div className="position-relative">
          <img className="rounded-circle" src="img/user.jpg" alt style={{width: 40, height: 40}} />
          <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
        </div>
        <div className="ms-3">
          <h6 className="mb-0">Arghya Sen</h6>
          <span>Admin</span>
        </div>
      </div>
      <div className="navbar-nav w-100">
        <Link to="/" className="nav-item nav-link"><i className="fa fa-tachometer-alt me-2" />Dashboard</Link>
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2" />Category</a>
          <div className="dropdown-menu bg-transparent border-0">
            <Link to="/addCategory" className="dropdown-item">Add</Link>
            <Link to="/manageCategory" className="dropdown-item">Manage</Link>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2" />Products</a>
          <div className="dropdown-menu bg-transparent border-0">
          <Link to="/addProducts" className="dropdown-item">Add</Link>
          <Link to="/manageProducts" className="dropdown-item">Manage</Link>
          </div>
        </div>
        <Link to="/adminOrders" class="nav-item nav-link"><i class="fa fa-chart-bar me-2"></i>Orders</Link>
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle active" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2" />Pages</a>
          <div className="dropdown-menu bg-transparent border-0">
            <a href="signin.html" className="dropdown-item">Sign In</a>
            <a href="signup.html" className="dropdown-item">Sign Up</a>
            <a href="404.html" className="dropdown-item">404 Error</a>
            <a href="blank.html" className="dropdown-item active">Blank Page</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
  {/* Sidebar End */}
  {/* Content Start */}
  <div className="content">
    {/* Navbar Start */}
    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0"><i className="fa fa-user-edit" /></h2>
      </a>
      <a href="#" className="sidebar-toggler flex-shrink-0">
        <i className="fa fa-bars" />
      </a>
      <form className="d-none d-md-flex ms-4">
        <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
      </form>
      <div className="navbar-nav align-items-center ms-auto">
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-envelope me-lg-2" />
            <span className="d-none d-lg-inline-flex">Message</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Arghya send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Arghya send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <div className="d-flex align-items-center">
                <img className="rounded-circle" src="img/user.jpg" alt style={{width: 40, height: 40}} />
                <div className="ms-2">
                  <h6 className="fw-normal mb-0">Arghya send you a message</h6>
                  <small>15 minutes ago</small>
                </div>
              </div>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">See all message</a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fa fa-bell me-lg-2" />
            <span className="d-none d-lg-inline-flex">Notificatin</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Profile updated</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">New user added</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <h6 className="fw-normal mb-0">Password changed</h6>
              <small>15 minutes ago</small>
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item text-center">See all notifications</a>
          </div>
        </div>
        <div className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <img className="rounded-circle me-lg-2" src="img/user.jpg" alt style={{width: 40, height: 40}} />
            <span className="d-none d-lg-inline-flex">John Doe</span>
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
            <a href="#" className="dropdown-item">My Profile</a>
            <a href="#" className="dropdown-item">Settings</a>
            <a href="#" className="dropdown-item">Log Out</a>
          </div>
        </div>
      </div>
    </nav>
    {/* Navbar End */}
    {/* Blank Start */}
   <Routes>
        <Route path="/" element={<DashBoard></DashBoard>}></Route>
        <Route path="/addCategory" element={<AddCategory></AddCategory>}></Route>
        <Route path="/manageCategory" element={<ManageCategory></ManageCategory>}></Route>
        <Route path="/addProducts" element={<AddProducts></AddProducts>}></Route>
        <Route path="/manageProducts" element={<ManageProducts></ManageProducts>}></Route>
        <Route path="/editCategory" element={<EditCategory></EditCategory>}></Route>
        <Route path="/adminOrders" element={<AdminOrders></AdminOrders>}></Route>
        <Route path="/adminOrderDetails" element={<AdminOrderDetails></AdminOrderDetails>}></Route>
        
   </Routes>
    {/* Blank End */}
    {/* Footer Start */}
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary rounded-top p-4">
        <div className="row">
          <div className="col-12 col-sm-6 text-center text-sm-start">
            © <a href="#">Your Site Name</a>, All Right Reserved. 
          </div>
          <div className="col-12 col-sm-6 text-center text-sm-end">
            {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
            Designed By <a href="https://htmlcodex.com">HTML Codex</a>
            <br />Distributed By: <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
          </div>
        </div>
      </div>
    </div>
    {/* Footer End */}
  </div>
  {/* Content End */}
  {/* Back to Top */}
  <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
</div>
 </Router>

  )
}

export default Home
