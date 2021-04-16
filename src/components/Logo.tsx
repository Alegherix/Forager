import React from 'react';
import BasketSVG from './svg/Basket';

const Logo: React.FC = () => {
  return (
    <div
      style={{ left: '3%', top: '3%' }}
      className="z-10 absolute flex items-center gap-2 bg-blue-200 rounded-lg p-1"
    >
      <h1 style={{ color: '#c97e4b' }} className="mr-2 text-3xl">
        Forager
      </h1>
      <BasketSVG />
    </div>
  );
};

export default Logo;
