import React from 'react';
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
  text-align: center;
  color: #9e70db;
  display: inline;
`;

const LogoContainer = styled.div`
  z-index: 2;
  position: absolute;
  left: 3%;
  top: 3%;
  height: 40px;
  width: 40px;
`;

function App() {
  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

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
      ></GoogleMap>
    </main>
  );
}

export default App;
