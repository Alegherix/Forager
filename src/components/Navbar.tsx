import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BasketSVG from './svg/Basket';

const Navbar = () => {
  const { logout } = useAuth();
  const history = useHistory();
  return (
    <nav className="w-full bg-marine h-20 flex justify-between px-4 mb-8 items-center text-white">
      <div
        className="flex items-center
        "
      >
        <h1 className="text-3xl mr-4">Forager</h1>
        <BasketSVG />
      </div>
      <div className="flex text-xl">
        <button
          className="hover:underline p-2 mr-4"
          onClick={() => {
            history.push('/');
          }}
        >
          Map
        </button>
        <button className="hover:underline" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
