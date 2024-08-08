import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from './homepage/UserState';
import CreateItem from './createItem';
import EditItem from './editItem';
import DeleteItem from './deleteItem';

 //------------------------------------------------USER INVENTORY/ADD/EDIT/DELETE ITEMS---------------------------------//
const Inventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventoryUser, setInventoryUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  useEffect(() => {
    const fetchUserAndItems = async () => {
      try {
        const userResponse = await fetch(`/api/users/${id}`, {
          credentials: 'include'
        });
        if (!userResponse.ok) {
          throw new Error('Failed to fetch this user\'s data');
        }
        const userData = await userResponse.json();
        setInventoryUser(userData);

        const itemsResponse = await fetch(`/api/items/user/${id}`, {
          credentials: 'include'
        });
        if (itemsResponse.status === 404) {
          setItems([]);
        } else if (!itemsResponse.ok) {
          throw new Error('Failed to fetch this user\'s items');
        } else {
          const itemsData = await itemsResponse.json();
          setItems(itemsData);
        }

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

  const handleItemUpdated = (updatedItem) => {
    setItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItem(null);
  };

  const handleItemDeleted = (deletedItemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== deletedItemId));
    setDeletingItem(null);
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!inventoryUser) return <div className="text-white">User not found</div>;

  const isOwnInventory = user && user.id === parseInt(id);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <Link to="/users" className="text-blue-400 hover:text-blue-300">&larr; Back to All Users</Link>
      <h1 className="text-3xl font-bold mt-4 mb-2">User Profile</h1>
      <h2 className="text-xl mb-4">{inventoryUser.first_name} {inventoryUser.last_name} (@{inventoryUser.username})</h2>
      <h3 className="text-lg font-semibold mb-2">Items:</h3>
      {items.length > 0 ? (
        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
              <Link to={`/item/${item.id}`} className="hover:text-blue-300">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-400">Quantity: {item.quantity}</p>
              </Link>
              {isOwnInventory && (
                <div className="mt-2 space-x-2">
                  <button onClick={() => setEditingItem(item)} className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                  <button onClick={() => setDeletingItem(item)} className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">This user has no items yet.</p>
      )}

      {isOwnInventory && (
        <div className="mt-8">
          <CreateItem userId={inventoryUser.id} onItemCreated={handleItemCreated} />
        </div>
      )}

      {editingItem && (
        <EditItem 
          item={editingItem} 
          onItemUpdated={handleItemUpdated} 
          onCancel={() => setEditingItem(null)} 
        />
      )}

      {deletingItem && (
        <DeleteItem 
          item={deletingItem} 
          onItemDeleted={handleItemDeleted} 
          onCancel={() => setDeletingItem(null)} 
        />
      )}
    </div>
  );
};

export default Inventory;