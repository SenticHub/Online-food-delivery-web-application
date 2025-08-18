import React, { useState,useEffect } from "react";
import './Cart.css';
const url = import.meta.env.VITE_BASE_URL;
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [summary, setSummary] = useState({ totalItems: 0, totalQuantity: 0, totalAmount: 0 });


  const updateQty = async (cartid, qty, index) => {
  console.log(cartid, " ", qty, " ", index); 
  qty = parseInt(qty); 

  if (qty === 0) {
    handleRemove(cartid, qty);
  }
  else{
  try {
    const response = await fetch(`${url}/cart/updateCart/${cartid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: qty }) 
    });

    if (!response.ok) {
      throw new Error('Failed to update cart');
    }
    const data = await response.json();
    console.log('Cart updated:', data);
    fetchCartItems();

  } catch (error) {
    console.error('Error:', error);
  }
}
};


  const fetchCartItems = async () => {
    try {
      const userId = localStorage.getItem('id')
      const res = await fetch(`${url}/cart/getCartByUser/${userId}`);
      const json = await res.json();

      if (json.success) {
        setCartItems(json.data.cartItems);
        console.log(17, json.data.cartItems)
        setSummary(json.data.summary);
        setUser(json.data.user);
      } else {
        alert("Failed to fetch cart: " + json.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleRemove = async (_id) => {
   
    if(confirm("are you sure to delete? "))
    {
       try {
      const res = await fetch(`${url}/cart/deleteCart/${_id}`, { method: 'DELETE' });
      const result = await res.json();
      console.log("Deleted:", result);
      //fetchCartItems(); // Refresh cart
      window.location.href="/cart"
    } catch (err) {
      console.error("Delete error:", err);
    }
    }
   
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
     document.body.appendChild(script);
   });
};
 const donate = async (amount) =>{
  var options = {
      "key": "rzp_test_agSIP3tMeNjkMT", // Enter the Key ID generated from the Dashboard
      "amount": amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Online Shopping", //your business name
      "description": "There are 3 Products.",
      "image": "https://images.shiksha.com/mediadata/images/1626695443phppjGnqq.jpeg",
      "handler": function async (response){
        alert("Payment Success, Your Transaction id: "+response.razorpay_payment_id);
        addOrder(response.razorpay_payment_id);
      }
      
  };

  var rzp1 = new window.Razorpay(options);
  rzp1.open();
}

const addOrder = async (pid) =>{
        const orderData = {
          userId: user._id,
          transactionId: pid,
          cartItems: cartItems,
          summary: summary
        };
      
      console.log("🚀 Order Data to Backend:", orderData);

      try {
        const res = await fetch(`${url}/order/addOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        });

        const data = await res.json();



        if (data.success) {
          alert("Order Placed Successfully!");
          window.location.href = "/cart"
        } else {
          alert("Failed to place order 1: " + data.message);
        }

      } catch (err) {
        console.error("❌ Error confirming order:", err);
        alert("Server error while saving order.");
      }
    }




  useEffect(() => {
    fetchCartItems();
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  return (
    <main className="page">
  <section className="shopping-cart dark">
    <div className="container">
      <div className="block-heading">
        <h2>Shopping Cart</h2>
      </div>
      <div className="content">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <div className="items">              
              {
                cartItems.map((cart, index) =>
                  <div className="product">
                      <div className="row">
                        <div className="col-md-3">
                          <img className="img-fluid mx-auto d-block image" src={cart.food.image} />
                        </div>
                        <div className="col-md-8">
                          <div className="info">
                            <div className="row">
                              <div className="col-md-3 product-name">
                                <div className="product-name">
                                  <a href="#">{cart.food.foodname}</a>                                  
                                  <div className="product-info">
                                    {/* <div>Display: <span className="value">5 inch</span></div>
                                    <div>RAM: <span className="value">4GB</span></div>
                                    <div>Memory: <span className="value">32GB</span></div> */}
                                  </div>
                                </div>            
                              </div>
                              <div className="col-md-2 quantity">
                               <input
                                      id="quantity" type="number" defaultValue={1}
                                      onChange={(e) => {
                                        const newQty = parseInt(e.target.value);
                                        if (newQty < 1) {
                                          const confirmChange = window.confirm("Quantity is less than 1. Are you sure?");
                                          if (confirmChange) {
                                            handleRemove(cart._id);
                                          }
                                        }
                                        else{
                                            updateQty(cart._id, newQty, index);
                                        }  
                                      }}
                                      className="form-control quantity-input"
                                    />   
                              </div>
                              {/* <div className="col-md-3 price">
                                <span>${cart.totalPrice}</span>
                              </div> */}

                              <div className="col-md-4 price">
                                <span>Rs. {cart.totalPrice}</span>                  
                              </div>

                              <div className="col-md-2 price">
                                <button
                                  className="btn btn-danger btn-sm mt-2"
                                  onClick={(e) => handleRemove(cart._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                )
              }
              
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <div className="summary">
              <h3>Summary</h3>
              <div className="summary-item"><span className="text">Subtotal</span><span className="price">Rs. {summary!=null ? summary.totalAmount : 0 }</span></div>
              <div className="summary-item"><span className="text">Discount</span><span className="price">$0</span></div>
              <div className="summary-item"><span className="text">Shipping</span><span className="price">$0</span></div>
              <div className="summary-item"><span className="text">Total</span><span className="price">Rs {summary!=null ? summary.totalAmount : 0 }</span></div>
              <button type="button" className="btn btn-primary btn-lg btn-block" onClick={(e) => donate(summary.totalAmount)}>Checkout</button>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </section>
</main>

  )
}
export default Cart
