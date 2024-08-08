import React, { useState } from 'react';

//------------------------------------------DELETE ITEM---------------------------//
const DeleteItem = ({ item, onItemDeleted, onCancel }) => {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setError(null);

    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete item');
      }

      onItemDeleted(item.id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-4">
      <h3 className="text-xl font-semibold mb-4">Delete Item</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="mb-4">Are you sure you want to delete "{item.name}"?</p>
      <div className="flex justify-between">
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
        <button onClick={onCancel} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancel</button>
      </div>
    </div>
  );
};

export default DeleteItem;