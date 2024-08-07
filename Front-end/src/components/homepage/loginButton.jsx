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
    <div>
      <div>
        <div>
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button type="submit">
              Login
            </button>
          </form>
          <button onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;