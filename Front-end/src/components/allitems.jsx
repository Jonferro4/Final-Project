import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//-------------------------------------------------FETCH ALL ITEMS---------------------------------//
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items', {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllItems;