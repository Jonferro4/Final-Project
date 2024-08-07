import React, { useState } from 'react';

//-------------------------------------------------BUTTON FIELDS---------------------------------//
const CreateButton = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
//------------------------------------------------POST NEW USER---------------------------------//
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'bad connection/response');
      }

      const data = await response.json();
      console.log('User created:', data);
      alert('User created successfully!');
      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        password: ''
      });
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <div>
        <div>
          <h3>Create Account</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
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
              Create Account
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

export default CreateButton;
