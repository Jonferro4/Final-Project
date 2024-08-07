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
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <button onClick={handleHomeClick}>Return to Homepage</button>
      <div>
        {user ? (
          <>
            <span>Logged in as: {user.username}</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </>
        ) : (
          <span>Not logged in</span>
        )}
      </div>
    </header>
  );
};

export default Header;