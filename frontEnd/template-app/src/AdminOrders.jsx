import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_BASE_URL;
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchAllOrders = async () => {
    try {
      const res = await fetch(`${url}/order/getAllOrders`); 
      const json = await res.json();
      console.log(12, json);
      if (json.success) {
        setOrders(json.data);
      } else {
        alert("No orders found.");
      }
    } catch (error) {
      console.error("Error fetching all orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Orders (Admin)</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, idx) => (
          <div className="card my-3" key={idx}>
            <div className="card-body">
              <h5 className="card-title">Order #{idx + 1} | User ID: {order.userId.userid}</h5>
              <p><strong>Total Items:</strong> {order.summary.totalItems}</p>
              <p><strong>Total Quantity:</strong> {order.summary.totalQuantity}</p>
              <p><strong>Total Amount:</strong> ₹{order.summary.totalAmount}</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/adminOrderDetails', { state: { cartItems: order.cartItems, summary: order.summary, userId: order.userId } })}
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

export default AdminOrders;
