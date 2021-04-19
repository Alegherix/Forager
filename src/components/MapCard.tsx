import { GoogleMap, Marker, useLoadScript } from '../pages/ForageMap';
import { IDBForageEntity } from '../utils/interfaces';
import mapStyle from '../utils/mapstyles';

const MapCard: React.FC<IDBForageEntity> = ({ lat, lng, createdAt, url }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
  });

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    gestureHandling: 'none',
  };

  if (loadError) return <div>Error loading Map...</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '300px',
        borderRadius: '10px',
        cursor: 'pointer',
      }}
      zoom={14}
      center={{ lat, lng }}
      options={options}
    >
      <Marker
        cursor={'default'}
        key={createdAt}
        position={{ lat, lng }}
        icon={{
          url: url,
          scaledSize: new window.google.maps.Size(50, 50),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(25, 25),
        }}
      />
    </GoogleMap>
  );
};
export default MapCard;
