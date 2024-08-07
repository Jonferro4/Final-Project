import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from './homepage/UserState';
import CreateItem from './createItem';

const Inventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventoryUser, setInventoryUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

//-------------------------------------------------FETCH ALL ITEMS SPECIFIC TO A USER---------------------------------//
useEffect(() => {
  const fetchUserAndItems = async () => {
    try {
      const userResponse = await fetch(`/api/users/${id}`, {
        credentials: 'include'
      });
      if (!userResponse.ok) {
        throw new Error('Failed to fetch this user"s data');
      }
      const userData = await userResponse.json();
      setInventoryUser(userData);

      const itemsResponse = await fetch(`/api/items/user/${id}`, {
        credentials: 'include'
      });
      if (!itemsResponse.ok) {
        throw new Error('Failed to fetch this user"s items');
      }
      const itemsData = await itemsResponse.json();
      setItems(itemsData);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  fetchUserAndItems();
}, [id, navigate]);

const handleItemCreated = (newItem) => {
  setItems(prevItems => [...prevItems, newItem]);
};

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
if (!inventoryUser) return <div>User not found</div>;

const isOwnInventory = user && user.id === parseInt(id);

return (
  <div>
    <Link to="/users">&larr; Back to All Users</Link>
    <h1>User Profile</h1>
    <h2>{inventoryUser.first_name} {inventoryUser.last_name} (@{inventoryUser.username})</h2>
    <h3>Items:</h3>
    {items.length > 0 ? (
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
    ) : (
      <p>No items found for this user.</p>
    )}

    {isOwnInventory && (
      <CreateItem userId={inventoryUser.id} onItemCreated={handleItemCreated} />
    )}
  </div>
);
};

export default Inventory;