import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [flag, setFlag] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const verifyOtp = () => {
    alert(otp+" "+generatedOtp)
    if (otp === generatedOtp) {
      alert('OTP verified successfully!');
      setFlag(3);
    } else {
      alert('Invalid OTP. Please try again.');
       setOtpAttempts(otpAttempts + 1);
    }
     if (otpAttempts >= 3) {
      alert('You have exceeded the maximum OTP attempts. Redirecting to login page.');
      navigate('/login');
      return;
    }
  };

  const handleSendOtp = async () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString(); 
    setGeneratedOtp(randomOtp);

    try {
      const response = await fetch('http://localhost:3000/user/send_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: randomOtp,
        }),
      });

      const data = await response.json();
      if (data.message === 'success') {
        alert('OTP sent to your email!');
        setFlag(2);
       
      } else if (data.message === 'Email not registered') {
        alert('Email not found. Please try again.');
      } else {
        alert('Failed to send OTP. Try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred while sending OTP.');
    }
  };
   const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/user/updatePassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (data.message === 'Password updated successfully.') {
        alert(data.message);
        navigate('/login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('An error occurred while resetting your password.');
    }
  };

  return (
    <div style={{ marginTop: '10%', marginLeft:'30%'}}>
      
      {/* Email Input */}
      {flag === 1 && (
        <div>
          <label htmlFor="email">Enter your email:</label><br />
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br/>
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      )}

      {/* OTP Input */}
      {flag === 2 && (
        <div>
          <label htmlFor="otp">Enter OTP:</label><br />
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          /><br />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}

      {/* New Password Input */}
      {flag === 3 && (
        <div>
          <label>New Password:</label><br />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          /><br />

          <label>Confirm Password:</label><br />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          /><br />

          <button onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}


    </div>
  );
};

export default ForgetPassword;

