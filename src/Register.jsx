import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./App.css";

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize Firebase Auth

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { // Check if passwords match
      setError("Passwords do not match. Please try again.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('userEmail', user.email); // Store user email in localStorage
      setError('');
      navigate('/list'); // Navigate to the to-do list page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-cover"> {/* Background picture same as login page */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md mt-4">
        <form onSubmit={handleRegister} className="space-y-6">
          <h1 className="text-3xl font-bold text-center">Register</h1>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
