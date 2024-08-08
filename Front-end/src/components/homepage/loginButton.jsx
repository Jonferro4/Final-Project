import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserState';

//-------------------------------------------------LOGIN FIELDS---------------------------------//
const LoginButton = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
//-------------------------------------------------LOGIN SUBMIT---------------------------------//
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData.username, formData.password);
      console.log('Login successful:', user);
      onClose();
      navigate(`/user/${user.id}`);
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="login-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Login</h3>
          <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
            />
            <button 
              type="submit"
              className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
            >
              Login
            </button>
          </form>
          <button 
            onClick={onClose}
            className="mt-3 w-full px-3 py-2 text-indigo-500 bg-white rounded-md border border-indigo-500 hover:bg-indigo-50 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;