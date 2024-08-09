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
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-6">All Items</h1>
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <Link to={`/item/${item.id}`} className="hover:text-blue-300">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-400">Quantity: {item.quantity}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllItems;