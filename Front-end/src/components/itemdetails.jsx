import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

 //------------------------------------------------SPECIFIC ITEM DETAILS---------------------------------//
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${id}`, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch item');
        }
        const data = await response.json();
        setItem(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);
  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!item) return <div className="text-white">Item not found</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Item Details</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{item.name}</h2>
        <div className="space-y-2">
          <p><span className="text-gray-400">Description:</span> {item.description}</p>
          <p><span className="text-gray-400">Quantity:</span> {item.quantity}</p>
          <p><span className="text-gray-400">Owner ID:</span> {item.user_id}</p>
          <p><span className="text-gray-400">Created at:</span> {new Date(item.created_at).toLocaleString()}</p>
          <p><span className="text-gray-400">Updated at:</span> {new Date(item.updated_at).toLocaleString()}</p>
        </div>
      </div>
      <Link to="/items" className="inline-block mt-6 text-blue-400 hover:text-blue-300">
        &larr; Back to All Items
      </Link>
    </div>
  );
};


export default ItemDetail;