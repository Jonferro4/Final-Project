import React, { createContext, useState, useContext, useEffect } from 'react';

const UserState = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//-------------------------------------------------USER AUTHENTICATION---------------------------------//
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuthStatus();
  }, []);
//-------------------------------------------------LOGIN AUTHENTICATION---------------------------------//
  const login = async (username, password) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      const userData = await response.json();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
//-------------------------------------------------LOGOUT AUTHENTICATION---------------------------------//
  const logout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include'
      });
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <UserState.Provider value={{ user, login, logout, checkAuthStatus }}>
      {children}
    </UserState.Provider>
  );
};

export const useUser = () => useContext(UserState);