"use client"; // Add this line to make the component a Client Component

import { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket'; // Ensure this path is correct for your socket connection

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post('http://localhost:8000/api/signup', formData);
      alert(response.data.message); // Show success message

      // Emit a signup event to the socket server
      socket.emit("User_Signed_Up", { username: formData.username, email: formData.email });

    } catch (error) {
      // Check if the error has a response from the server
      if (error.response && error.response.data) {
        alert(error.response.data.error); // Show the specific error message
      } else {
        alert('An unexpected error occurred. Please try again later.'); // Fallback message
      }
    }
  };

  useEffect(() => {
    // Listen for any messages or events from the server (if needed)
    socket.on("User_Signed_Up", (data) => {
      console.log("User signed up:", data);
      // Handle any UI updates or notifications here if needed
    });

    return () => {
      // Clean up the socket connection on component unmount
      socket.off("User_Signed_Up");
    };
  }, []); // Add an empty dependency array to run the effect only once

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">Create Your Account</h1>
        <p className="text-center text-gray-400">Join us to experience the future of connectivity</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={formData.username} 
              onChange={handleChange} 
              required
              className="w-full px-4 py-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={handleChange} 
              required
              className="w-full px-4 py-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              required
              className="w-full px-4 py-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500"
          >
            Sign Up
          </button>
        </form>
        
        <p className="text-center text-gray-400">Already have an account? <a href="#" className="text-purple-500 hover:underline">Log in</a></p>
      </div>
    </div>
  );
}
