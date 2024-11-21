import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPhotoPreview(URL.createObjectURL(file)); // Generate a preview URL for the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password || !profilePhoto) {
      setError('All fields, including profile photo, are required!');
      setSuccess('');
      return;
    }

    if (!email.includes('@') || password.length < 6) {
      setError('Invalid email or password must be at least 6 characters long!');
      setSuccess('');
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", profilePhoto); // Ensure this is the correct key expected by the server

    try {
      // Make the API call to register
      const response = await axios.post("http://localhost:5000/chat/register/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // Handle success
        setSuccess('Registration successful! Please login.');
        setError('');
        // Redirect to login page after success
        setTimeout(() => {
          window.location.href = '/login'; // This can be replaced by React Router for better navigation control
        }, 2000); // Optional: Give user time to read the success message before redirecting
      }
    } catch (error) {
      // Handle error - handle error more gracefully based on API response
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      setSuccess('');
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center">Register</h2>

        {/* Display error or success messages */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {photoPreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Preview:</p>
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
