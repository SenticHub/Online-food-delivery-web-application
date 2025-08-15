import React from "react";
import { useLocation } from "react-router-dom";
import './Cart.css';

const AdminOrderDetails = () => {
  const location = useLocation();
  const { cartItems, summary, userId } = location.state || { cartItems: [], summary: {}, userId: "" };

  return (
    <main className="page">
      <section className="shopping-cart dark">
        <div className="container">
          <div className="block-heading">
            <h2>Admin Order Details</h2>
            <p><strong>User ID:</strong> {userId.userid}</p>
          </div>
          <div className="content">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="items">
                  {cartItems.map((cart, index) => (
                    <div className="product" key={index}>
                      <div className="row">
                        <div className="col-md-3">
                          <img className="img-fluid mx-auto d-block image" src={cart.food.image} alt="food"/>
                        </div>
                        <div className="col-md-8">
                          <div className="info">
                            <div className="row">
                              <div className="col-md-3 product-name">
                                <a href="#">{cart.food.foodname}</a>
                              </div>
                              <div className="col-md-2 quantity">
                                <input
                                  type="number"
                                  value={cart.quantity}
                                  readOnly
                                  className="form-control quantity-input"
                                />
                              </div>
                              <div className="col-md-4 price">
                                <span>Rs. {cart.totalPrice}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-12 col-lg-4">
                <div className="summary">
                  <h3>Summary</h3>
                  <div className="summary-item"><span className="text">Subtotal</span><span className="price">Rs. {summary.totalAmount}</span></div>
                  <div className="summary-item"><span className="text">Discount</span><span className="price">Rs. 0</span></div>
                  <div className="summary-item"><span className="text">Shipping</span><span className="price">Rs. 0</span></div>
                  <div className="summary-item"><span className="text">Total</span><span className="price">Rs. {summary.totalAmount}</span></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminOrderDetails;
