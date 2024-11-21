import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to CHIT-ChAT</h1>
      <p className="text-lg mb-10">Connect with your friends in real-time!</p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-white text-blue-500 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-purple-700 rounded-lg shadow-md hover:bg-purple-600 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
