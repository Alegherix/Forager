import React from 'react';

interface MapUIComponentProps {
  Icon: React.FC;
  bottomOfset: number;
  callback?: () => void;
}

const MapUIComponent: React.FC<MapUIComponentProps> = ({
  Icon,
  bottomOfset,
  callback,
}) => {
  return (
    <div
      style={{ bottom: `${bottomOfset}px` }}
      onClick={callback}
      className={`z-10 absolute left-0 bg-white border-purple-500 border-4 p-2 rounded-md cursor-pointer hover:bg-purple-300 w-18 h-18`}
    >
      <Icon />
    </div>
  );
};

export default MapUIComponent;
