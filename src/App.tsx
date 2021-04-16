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
import { IForage, IMarker } from './utils/interfaces';
import forages from './utils/data';

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

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);
  const [selectedForage, setSelectedForage] = useState<IForage>(forages[0]);

  const onMapClick = (event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng?.lat()!,
        lng: event.latLng?.lng()!,
        time: new Date(),
        selectedForage: selectedForage,
      },
    ]);
  };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div>Error loading...</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className="relative">
      <div
        style={{ left: '3%', top: '3%' }}
        className="z-10 absolute flex items-center gap-2 bg-blue-200 rounded-lg p-1"
      >
        <h1 style={{ color: '#c97e4b' }} className="mr-2 text-3xl">
          Forager
        </h1>
        <BasketSVG />
      </div>

      <div
        style={{ top: 0, left: '50%' }}
        className="px-2 bg-white absolute z-10"
      >
        <p className="text-center">Debug</p>
        <p>{JSON.stringify(selectedForage)}</p>
      </div>

      <ForagePicker setSelectedForage={setSelectedForage} />

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
                url: marker.selectedForage.url || '/blueberry.svg',
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
              <h2>Din {selectedMarker.selectedForage.name}</h2>
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
