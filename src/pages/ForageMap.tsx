import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { formatRelative } from 'date-fns';
import 'firebase/auth';
import React, { useCallback, useRef, useState } from 'react';
import { saveToDatabase } from '../auth/authOperations';
import ForagePicker from '../components/ForagePicker';
import Locate from '../components/Locate';
import forages from '../utils/data';
import { IDBForageEntity, IForage, IMarker } from '../utils/interfaces';
import mapStyle from '../utils/mapstyles';
import { collectedForages } from '../auth/authOperations';

// TODO -> Sätt upp någon form av event listener för att försöka göra så att man enbart lägger till en forage vid double tap,
// TODO -> Skapa clusters när vi har flera forages vid samma ställe

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
  gestureHandling: 'greedy',
};

function ForageMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<IMarker | null>(null);
  const [selectedForage, setSelectedForage] = useState<IForage>(forages[0]);
  const [databaseForage, setDatabaseForage] = useState<IDBForageEntity[]>([]);
  // const [selectedDbForage, setSelectedDbForage] = useState<

  const onMapClick = (event) => {
    // Add markers to Local State
    const newEvent = {
      lat: event.latLng?.lat()!,
      lng: event.latLng?.lng()!,
      createdAt: new Date(),
      selectedForage: selectedForage,
    };
    setMarkers((current) => [...current, newEvent]);

    saveToDatabase({
      lat: newEvent.lat,
      lng: newEvent.lng,
      name: newEvent.selectedForage.name,
      url: newEvent.selectedForage.url,
    });
  };

  const mapRef = useRef<GoogleMap>();
  const onMapLoad = useCallback(async (map) => {
    mapRef.current = map;
    const forages = await collectedForages();
    setDatabaseForage(forages);
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current!.panTo({ lat, lng });
    // Won't compile otherwise cause can't find setZoom function.
    // @ts-ignore: Unreachable code error
    mapRef.current!.setZoom(19);
  }, []);

  if (loadError) return <div>Error loading Map...</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className="relative">
      <Locate panTo={panTo} />
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
              key={marker.createdAt.toISOString()}
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

        {databaseForage.map(({ lat, lng, createdAt, url }) => {
          return (
            <Marker
              key={createdAt}
              position={{ lat, lng }}
              icon={{
                url: url || '/blueberry.svg',
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              // onClick={() => {
              //   setSelectedMarker(marker);
              // }}
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
                Tillagd den{' '}
                {formatRelative(selectedMarker.createdAt, new Date())}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </main>
  );
}

export default ForageMap;
