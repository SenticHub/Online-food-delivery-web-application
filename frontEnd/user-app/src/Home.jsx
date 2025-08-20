import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
       <div className="container-fluid p-0 mb-5 wow fadeIn" data-wow-delay="0.1s">
    <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
          <div className="carousel-caption">
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-lg-7">
                  <h1 className="display-2 mb-5 animated slideInDown">Organic Food Is Good For Health</h1>
                  <Link to="/product" className="btn btn-primary rounded-pill py-sm-3 px-sm-5">Products</Link>
                  {/* <a href className="btn btn-secondary rounded-pill py-sm-3 px-sm-5 ms-3">Services</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
          <div className="carousel-caption">
            <div className="container">
              <div className="row justify-content-start">
                <div className="col-lg-7">
                  <h1 className="display-2 mb-5 animated slideInDown">Natural Food Is Always Healthy</h1>
                  <a href className="btn btn-primary rounded-pill py-sm-3 px-sm-5">Products</a>
                  <a href className="btn btn-secondary rounded-pill py-sm-3 px-sm-5 ms-3">Services</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div className="container-fluid bg-primary bg-icon mt-5 py-6">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-md-7 wow fadeIn" data-wow-delay="0.1s">
          <h1 className="display-5 text-white mb-3">Visit Our Firm</h1>
          <p className="text-white mb-0">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.</p>
        </div>
        <div className="col-md-5 text-md-end wow fadeIn" data-wow-delay="0.5s">
          <a className="btn btn-lg btn-secondary rounded-pill py-3 px-5" href>Visit Now</a>
        </div>
      </div>
    </div>
  </div>
  <div className="container-fluid bg-light bg-icon py-6 mb-5">
    <div className="container">
      <div className="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth: 500}}>
        <h1 className="display-5 mb-3">Customer Review</h1>
        <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
      </div>
      <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
        <div className="testimonial-item position-relative bg-white p-5 mt-4">
          <i className="fa fa-quote-left fa-3x text-primary position-absolute top-0 start-0 mt-n4 ms-5" />
          <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
          <div className="d-flex align-items-center">
            <img className="flex-shrink-0 rounded-circle" src="img/testimonial-1.jpg" alt />
            <div className="ms-3">
              <h5 className="mb-1">Client Name</h5>
              <span>Profession</span>
            </div>
          </div>
        </div>
        <div className="testimonial-item position-relative bg-white p-5 mt-4">
          <i className="fa fa-quote-left fa-3x text-primary position-absolute top-0 start-0 mt-n4 ms-5" />
          <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
          <div className="d-flex align-items-center">
            <img className="flex-shrink-0 rounded-circle" src="img/testimonial-2.jpg" alt />
            <div className="ms-3">
              <h5 className="mb-1">Client Name</h5>
              <span>Profession</span>
            </div>
          </div>
        </div>
        <div className="testimonial-item position-relative bg-white p-5 mt-4">
          <i className="fa fa-quote-left fa-3x text-primary position-absolute top-0 start-0 mt-n4 ms-5" />
          <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
          <div className="d-flex align-items-center">
            <img className="flex-shrink-0 rounded-circle" src="img/testimonial-3.jpg" alt />
            <div className="ms-3">
              <h5 className="mb-1">Client Name</h5>
              <span>Profession</span>
            </div>
          </div>
        </div>
        <div className="testimonial-item position-relative bg-white p-5 mt-4">
          <i className="fa fa-quote-left fa-3x text-primary position-absolute top-0 start-0 mt-n4 ms-5" />
          <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
          <div className="d-flex align-items-center">
            <img className="flex-shrink-0 rounded-circle" src="img/testimonial-4.jpg" alt />
            <div className="ms-3">
              <h5 className="mb-1">Client Name</h5>
              <span>Profession</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
    
  )
}

export default Home
