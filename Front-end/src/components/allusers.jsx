import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


//-------------------------------------------------FETCH ALL USERS---------------------------------//
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <Link to={`/user/${user.id}`} className="hover:text-blue-300">
              <h2 className="text-xl font-semibold">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-gray-400">@{user.username}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default AllUsers;