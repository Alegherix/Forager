import React, { useCallback, useRef, useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import mapStyle from './utils/mapstyles';
import styled from 'styled-components';
import MushromSVG from './components/svg/Mushroom';
import { formatRelative } from 'date-fns';
import BasketSVG from './components/svg/Basket';
import ForagePicker from './components/ForagePicker';

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
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

const Title = styled.h1`
  font-size: 2rem;
  margin: 0;
  color: #c97e4b;
  margin-right: 0.5rem;
`;

const LogoContainer = styled.div`
  z-index: 2;
  position: absolute;
  left: 3%;
  top: 3%;
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 0.3rem;
  background-color: #96c6f388;
  padding: 0.4rem 1rem;
  border-radius: 1rem;
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
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);

  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng?.lat()!,
        lng: event.latLng?.lng()!,
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div>Error loading...</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main style={{ position: 'relative' }}>
      <LogoContainer>
        <Title>Forager</Title>
        <BasketSVG />
      </LogoContainer>

      <ForagePicker />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => {
          return (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: '/mushroom.svg',
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                setSelectedMarker(marker);
              }}
            />
          );
        })}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div>
              <h2>Din svamp</h2>
              <p>
                Tillagd den {formatRelative(selectedMarker.time, new Date())}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </main>
  );
}

export default App;
