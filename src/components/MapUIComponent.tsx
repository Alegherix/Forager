import React from 'react';

interface MapUIComponentProps {
  Icon: React.FunctionComponent;
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
      onClick={callback}
      className={`z-10 absolute bottom-${bottomOfset} left-0 bg-white border-purple-500 border-4 p-2 rounded-md cursor-pointer hover:bg-purple-300`}
    >
      <Icon />
    </div>
  );
};

export default MapUIComponent;
