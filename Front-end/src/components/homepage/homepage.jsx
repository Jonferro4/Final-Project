import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserState';
import CreateButton from './createButton';
import LoginButton from './loginButton';

const HomePage = () => {
  const { user, logout } = useUser();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">US Retail Stock</h1>
        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            {!user ? (
              <>
                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
                  Create Account
                </button>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out">
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={logout}
                className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out">
                Logout
              </button>
            )}
          </div>
          <div className="flex justify-center space-x-4">
            <Link
              to="/users"
              className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition duration-300 ease-in-out">
              View All Users
            </Link>
            <Link
              to="/items"
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 ease-in-out">
              View All Items
            </Link>
          </div>
        </div>
      </div>
      <CreateButton isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <LoginButton isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default HomePage;