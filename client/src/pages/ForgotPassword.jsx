import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!otpSent) {
      // Backend OTP send logic yaha
      console.log("Sending OTP to:", email);
      setOtpSent(true);
    } else {
      // OTP verify logic
      console.log("Verifying OTP:", otp);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-2 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        
        {/* Logo + Welcome Text */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Welcome to To-Do App</h1>
          <p className="text-gray-500 text-sm">Manage your tasks efficiently</p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        <form className="space-y-4" onSubmit={handleSendOtp}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Enter your registered Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* OTP Input */}
          {otpSent && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP sent to your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            {otpSent ? "Verify OTP" : "Send OTP"}
          </button>

          <div className="flex justify-center text-sm">
            <NavLink to="/login" className="text-blue-600 hover:underline">
              Back to Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
