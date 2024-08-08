import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserState';

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

 //-------------------------------------------------LOGOUT---------------------------------//
  const handleLogout = () => {
    logout();
    navigate('/');
  };

//-------------------------------------------------HOME BUTTON---------------------------------//
  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <button 
        onClick={handleHomeClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Return to Homepage
      </button>
      <div>
        {user ? (
          <div className="flex items-center">
            <span className="mr-4">Logged in as: {user.username}</span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <span className="text-gray-300">Not logged in</span>
        )}
      </div>
    </header>
  );
};

export default Header;