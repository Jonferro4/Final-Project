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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div>
      <h1>Item Details</h1>
      <h2>{item.name}</h2>
      <p>Description: {item.description}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Owner ID: {item.user_id}</p>
      <p>Created at: {new Date(item.created_at).toLocaleString()}</p>
      <p>Updated at: {new Date(item.updated_at).toLocaleString()}</p>
      <Link to="/items">&larr; Back to All Items</Link>
    </div>
  );
};

export default ItemDetail;