import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BasketSVG from './svg/Basket';

const Burger = ({ setOpen, open }) => {
  const handleBurger = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div
      onClick={handleBurger}
      className="flex flex-col items-center justify-center relative cursor-pointer h-8"
    >
      <div
        className={`w-10 h-1 bg-white rounded-md shadow-md transform duration-200 ease-in-out -translate-y-2 ${
          open && 'rotate-45 translate-y-full'
        }`}
      ></div>
      <div
        className={`w-10 h-1 bg-white rounded-md shadow-md transform duration-75 ease-in-out ${
          open && '-translate-x-14 opacity-0 shadow-none'
        }`}
      ></div>
      <div
        className={`w-10 h-1 bg-white rounded-md shadow-md transform duration-200 ease-in-out translate-y-2 ${
          open && '-rotate-45 -translate-y-full'
        }`}
      ></div>
    </div>
  );
};

const Navbar = () => {
  const { logout } = useAuth();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  return (
    <nav
      // pb-4 =16px, 80px is baseline height, 100px is ul
      style={{ height: open ? 'calc(100px + 80px + 16px)' : '80px' }}
      className="flex flex-col bg-marine w-full text-white mb-8"
    >
      <div className="flex justify-between items-center h-full w-full px-4">
        <div
          className="flex items-center
        "
        >
          <h1 className="text-3xl mr-4">Forager</h1>
          <BasketSVG />
        </div>
        <Burger open={open} setOpen={setOpen} />
      </div>
      {open && (
        <ul className="flex items-center justify-center flex-col bg-marine gap-2 text-xl pb-4">
          <li onClick={() => history.push('/dashboard')}>Dashboard</li>
          <li onClick={() => history.push('/')}>Map</li>
          <li onClick={logout}>Logout</li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
