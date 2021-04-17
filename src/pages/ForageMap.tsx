import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { formatRelative } from 'date-fns';
import firebase from 'firebase/app';
import 'firebase/auth';
import React, { useCallback, useRef, useState } from 'react';
import { collectedForages, saveToDatabase } from '../auth/authOperations';
import ForagePicker from '../components/ForagePicker';
import Locate from '../components/Locate';
import forages from '../utils/data';
import { IDBForageEntity, UIForage } from '../utils/interfaces';
import mapStyle from '../utils/mapstyles';

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

  const [marker, setMarker] = useState<IDBForageEntity | null>(null);
  const [selectedUIForage, setSelectedUIForage] = useState<UIForage>(
    forages[0]
  );
  const [forage, setForage] = useState<IDBForageEntity[]>([]);

  const onMapClick = (event) => {
    const newForage: IDBForageEntity = {
      lat: event.latLng?.lat()!,
      lng: event.latLng?.lng()!,
      name: selectedUIForage.name,
      url: selectedUIForage.url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    saveToDatabase(newForage);
    setForage((current) => [...current, newForage]);
  };

  const mapRef = useRef<GoogleMap>();
  const onMapLoad = useCallback(async (map) => {
    mapRef.current = map;
    const forages = await collectedForages();
    setForage(forages);
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
      <ForagePicker setSelectedForage={setSelectedUIForage} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {forage.map((forage) => {
          const { lat, lng, createdAt, url } = forage;
          return (
            <Marker
              key={createdAt}
              position={{ lat, lng }}
              icon={{
                url: url,
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                setMarker(forage);
              }}
            />
          );
        })}

        {marker && (
          <InfoWindow
            position={{ lat: marker.lat, lng: marker.lng }}
            onCloseClick={() => {
              setMarker(null);
            }}
          >
            <div>
              <h2>Your {marker.name}</h2>
              <p>
                Added:{' '}
                {formatRelative(
                  new Date(marker.createdAt.seconds * 1000),
                  new Date()
                )}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </main>
  );
}

export default ForageMap;
