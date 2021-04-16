import React from 'react';
import CompassSVG from './svg/Compass';

interface LocateProps {
  panTo: ({ lat, lng }: any) => void;
}

const Locate: React.FC<LocateProps> = ({ panTo }) => {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {
              coords: { latitude, longitude },
            } = position;
            panTo({
              lat: latitude,
              lng: longitude,
            });
            console.log('Lat', latitude);
            console.log('Lon', longitude);
          },
          (err) => {
            console.log(err);
          }
        );
      }}
      style={{ right: '3%', top: '3%' }}
      className="z-10 absolute focus:outline-none"
    >
      <CompassSVG />
    </button>
  );
};

export default Locate;
