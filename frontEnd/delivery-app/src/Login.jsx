import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch(`${BASE}/delivery/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });
      const data = await res.json();
      if (data.deliveryId) {
        localStorage.setItem("delivery", JSON.stringify(data));
        navigate("/delivery");
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (e) {
      console.error(e);
      alert("Login error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Delivery Login</h2>
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <button onClick={handleLogin} style={{ width: "100%", padding: 10 }}>
        Login
      </button>
    </div>
  );
}
