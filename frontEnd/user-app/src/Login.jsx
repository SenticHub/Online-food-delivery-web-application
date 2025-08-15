import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async (e) => {
    e.preventDefault(); 

    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }

    const login_user = {
      userid: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/user/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login_user),
      });

      const data = await response.json();
      console.log(32,data)

      if (data.length>0) {
         toast("Login Success")
         localStorage.setItem("id", data[0]._id)
         window.location.href="/"
      
      } else {
          toast("Login failed")
          setMessage("");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }
  };


  
    return (
      <div>
        <ToastContainer />
        <div className="split-form">
            <div className="image-side">
                <h2>Welcome Back!</h2>
                <p>Enter your details to access your account</p>
            </div>
            <div className="form-side">
                <h2>Sign In</h2>
                <form >
                <input type="email" placeholder="Email" required onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" onClick={login}>Login</button>
                <a href="/forgotPassword">forgotPassword</a>
                <p>{message}</p>
                New user? <a href="/registration"> Register here</a>
                
                </form>
            </div>
        </div>


      </div>
    );
}

export default Login
