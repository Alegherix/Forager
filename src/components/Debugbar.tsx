import React from 'react';

interface DebugbarProps {
  selectedForage: any;
}

const Debugbar: React.FC<DebugbarProps> = ({ selectedForage }) => {
  return (
    <div
      style={{ top: 0, left: '50%' }}
      className="px-2 bg-white absolute z-10"
    >
      <p className="text-center">Debug</p>
      <p>{JSON.stringify(selectedForage)}</p>
    </div>
  );
};

export default Debugbar;
