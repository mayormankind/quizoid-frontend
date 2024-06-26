"use client";
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import path from 'path';
const url = process.env.NEXT_PUBLIC_BASE_API_URL;



export default function StudentLogin() {
  const router = useRouter(); 

  const [matricNumber, setmatricNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${url}/login`,{ matricNumber, password });
      Cookies.set('token', response.data.token, {expires: 1, path: '/', sameSite: 'Strict'}); 
      console.log("Login successful:", response.data);
      toast.success("Login successful");
      // router.push('/dashboard', { scroll: false });
    }
    catch (error: any) {
      if (error.response) {
        toast.error(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response was received
        toast.error('login failed: No response from server');
      } else {
        // Something else happened in setting up the request
        toast.error(`login failed: ${error.message}`);
        console.error("Login failed:", error?.response?.data?.message);
        // Display error message using toastify
        toast.error("Invalid matric number or password.");
      }

    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Lecturer Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin" className="block text-sm font-medium text-gray-700">
              Lecturer ID
            </label>
            <input
              type="text"
              value={matricNumber}
              onChange={(e) => setmatricNumber(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-green-400 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}
