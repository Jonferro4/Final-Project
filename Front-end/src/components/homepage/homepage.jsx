import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateButton from './createButton';
import LoginButton from './loginButton';
import { useUser } from './UserState';

const HomePage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useUser();

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Video Game Collection</h1>
      
      <div className="space-y-4">
        <div className="space-x-4">
          {!user ? (
            <>
              <button
                onClick={openCreateModal}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Create Account
              </button>
              <button
                onClick={openLoginModal}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          )}
        </div>

        <div className="space-x-4">
          <Link to="/users" className="px-4 py-2 bg-purple-500 text-white rounded inline-block">
            View All Users
          </Link>
          <Link to="/items" className="px-4 py-2 bg-yellow-500 text-white rounded inline-block">
            View All Items
          </Link>
        </div>
      </div>

      <CreateButton isOpen={isCreateModalOpen} onClose={closeCreateModal} />
      <LoginButton isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
};

export default HomePage;