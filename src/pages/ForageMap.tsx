import {
  GoogleMap,
  Marker,
  useLoadScript,
  MarkerClusterer,
} from '@react-google-maps/api';
import { useCallback, useRef, useState } from 'react';
import firebase, {
  collectedForages,
  saveToDatabase,
} from '../auth/authOperations';
import ForagePicker from '../components/ForagePicker';
import Locate from '../components/Locate';
import MapInfoWindow from '../components/MapInfoWindow';
import Settings from '../components/Settings';
import forages from '../utils/data';
import { IDBForageEntity, UIForage } from '../utils/interfaces';
import mapStyle from '../utils/mapstyles';

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
  disableDoubleClickZoom: true,
};

function ForageMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  // Used for painting infoBox of current selected forage
  const [marker, setMarker] = useState<IDBForageEntity | null>(null);

  // Sets the selected forage from DB
  const [forage, setForage] = useState<IDBForageEntity[]>([]);

  // Used for syncing UI forage components with IDBForageEntities
  const [selectedUIForage, setSelectedUIForage] = useState<UIForage>(
    forages[0]
  );

  const onMapClick = async (event) => {
    const newForage: IDBForageEntity = {
      lat: event.latLng?.lat()!,
      lng: event.latLng?.lng()!,
      name: selectedUIForage.name,
      url: selectedUIForage.url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const id = await saveToDatabase(newForage);
    newForage.id = id;

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
    <main className="relative overflow-hidden">
      <Locate panTo={panTo} />
      <ForagePicker setSelectedForage={setSelectedUIForage} />
      <Settings />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onDblClick={onMapClick}
      >
        <MarkerClusterer gridSize={25}>
          {(clusterer) =>
            forage.map((forage) => {
              const { lat, lng, createdAt, url } = forage;
              return (
                <Marker
                  clusterer={clusterer}
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
            })
          }
        </MarkerClusterer>

        {marker && <MapInfoWindow marker={marker} setMarker={setMarker} />}
      </GoogleMap>
    </main>
  );
}

export { GoogleMap, Marker, useLoadScript, ForageMap as default };
