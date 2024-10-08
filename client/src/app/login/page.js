// src/app/login/page.js
"use client";

import { useState, useEffect } from 'react'; // Add useEffect import
import axios from 'axios';
import socket from '../socket'; // Import the socket connection

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      alert(response.data.message); // Show success message

      // Emit a login event to the socket server
      socket.emit("User_Logged_In", { email: formData.email });

    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.error); // Show specific error message
      } else {
        alert('An unexpected error occurred. Please try again later.'); // Fallback message
      }
    }
  };

  useEffect(() => {
    // Listen for any messages or events from the server (if needed)
    socket.on("User_Logged_In", (data) => {
      console.log("User logged in:", data);
      // Handle any UI updates or notifications here
    });

    return () => {
      // Clean up the socket connection on component unmount
      socket.off("User_Logged_In");
    };
  }, []);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={handleChange} 
              required
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              required
              className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Don't have an account? 
          <a href="/signup" className="text-blue-500 hover:underline"> Sign up</a>
        </p>
      </div>
    </div>
  );
}
