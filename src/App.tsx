import React, { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import mapStyles from './utils/mapstyles';
import styled from 'styled-components';
import MushromSVG from './components/svg/Mushroom';

const libraries: Libraries = ['places'];
const mapContainerStyle = {
  width: '100vvw',
  height: '100vh',
};
const center = {
  lat: 57.652,
  lng: 12.116,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Title = styled.h1`
  font-size: 3rem;
  color: #9e70db;
`;

const LogoContainer = styled.div`
  z-index: 2;
  position: absolute;
  left: 3%;
  top: 3%;
  width: 300px;
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 0.3rem;
`;

interface IMarker {
  lat: number;
  lng: number;
  time: Date;
}

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [markers, setMarkers] = useState<IMarker[]>([]);

  if (loadError) return <div>Error loading...</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main>
      <LogoContainer>
        <Title>Forager</Title>
        <MushromSVG />
      </LogoContainer>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onClick={(event) => {
          setMarkers((current) => [
            ...current,
            {
              lat: event.latLng?.lat()!,
              lng: event.latLng?.lng()!,
              time: new Date(),
            },
          ]);
        }}
      >
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
            />
          );
        })}
      </GoogleMap>
    </main>
  );
}

export default App;
