import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { formatRelative } from 'date-fns';
import React, { useCallback, useRef, useState } from 'react';
import ForagePicker from './components/ForagePicker';
import Locate from './components/Locate';
import Logo from './components/Logo';
import forages from './utils/data';
import { IForage, IMarker } from './utils/interfaces';
import mapStyle from './utils/mapstyles';

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

  const mapRef = useRef<GoogleMap>();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current!.panTo({ lat, lng });
    // Won't compile otherwise cause can't find setZoom function.
    // @ts-ignore: Unreachable code error
    mapRef.current!.setZoom(16);
  }, []);

  if (loadError) return <div>Error loading...</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className="relative">
      <Logo />
      <Locate panTo={panTo} />
      {/* <Debugbar selectedForage={selectedForage} /> */}
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
