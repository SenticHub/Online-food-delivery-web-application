import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BASE_URL;
const Order = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${url}/order/getOrdersByUser/${userId}`);
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
      } else {
        alert("No previous orders found.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleReorder = async (cartItems) => {
    try {
      for (const item of cartItems) {
        await fetch(`${url}/cart/addCart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            foodId: item.foodId,
            quantity: item.quantity
          }),
        });
      }
      alert("Items added to cart!");
      window.location.href = "/cart";
    } catch (error) {
      console.error("Error during reorder:", error);
      alert("Failed to reorder");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No previous orders found.</p>
      ) : (
        orders.map((order, idx) => (
          <div className="card my-3" key={idx}>
            <div className="card-body">
              <h5 className="card-title">Order #{idx + 1}</h5>
              <p><strong>Total Items:</strong> {order.summary.totalItems}</p>
              <p><strong>Total Quantity:</strong> {order.summary.totalQuantity}</p>
              <p><strong>Total Amount:</strong> ₹{order.summary.totalAmount}</p>
              <ul>
                {order.cartItems.map((item, i) => (
                  <li key={i}>
                    Food ID: {item.foodId}, Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary" onClick={() => handleReorder(order.cartItems)}>
                Reorder
              </button>

              {/* here create order details button*/}
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/orderDetails', { state: { cartItems: order.cartItems, summary: order.summary } })}
              >
                Details
            </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
