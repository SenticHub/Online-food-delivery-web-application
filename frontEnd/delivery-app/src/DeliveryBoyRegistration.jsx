import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE = import.meta.env.VITE_BASE_URL;

const DeliveryBoyRegistration = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const register = async () => {
    if (!name || !phone || !password) {
      toast.error("Please fill all required fields");
      return;
    }

    const deliveryPartner = {
      name,
      phone,
      password,
      vehicleNumber,
    };

    try {
      const response = await fetch(`${BASE}/delivery/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deliveryPartner),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Delivery Partner Registered Successfully");
        setName("");
        setPhone("");
        setPassword("");
        setVehicleNumber("");
      } else {
        toast.error(data.msg || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
  <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 10, boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
    <h2 style={{ textAlign: "center", marginBottom: 20 }}>Delivery Partner Sign Up</h2>

    {/* Name */}
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Full Name"
      style={{ width: "100%", padding: 8, marginBottom: 10 }}
    />

    {/* Phone */}
    <input
      type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      placeholder="Phone Number"
      style={{ width: "100%", padding: 8, marginBottom: 10 }}
    />

    {/* Password */}
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      style={{ width: "100%", padding: 8, marginBottom: 10 }}
    />

    {/* Vehicle Number */}
    <input
      type="text"
      value={vehicleNumber}
      onChange={(e) => setVehicleNumber(e.target.value)}
      placeholder="Vehicle Number (e.g. KA-05-1234)"
      style={{ width: "100%", padding: 8, marginBottom: 10 }}
    />

    {/* Submit */}
    <button
      onClick={register}
      style={{
        width: "100%",
        padding: 10,
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
      }}
    >
      Register
    </button>
  </div>
);

};

export default DeliveryBoyRegistration;
