import React, { useState } from 'react';


//------------------------------------------CREATE ITEM---------------------------//
const CreateItem = ({ userId, onItemCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_id: userId,
          quantity: parseInt(formData.quantity, 10)
        }),
        credentials: 'include'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create item');
      }
      const newItem = await response.json();
      onItemCreated(newItem);
      setFormData({ name: '', description: '', quantity: '' });
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div>
      <h3>Create New Item</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default CreateItem;