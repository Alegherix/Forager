import { InfoWindow } from '@react-google-maps/api/';
import { formatRelative } from 'date-fns';
import React from 'react';
import { useHistory } from 'react-router-dom';
import useModal from '../hooks/useModal';
import { IDBForageEntity } from '../utils/interfaces';
import Modal from './Modal';

interface IMapInfo {
  marker: IDBForageEntity;
  setMarker: (forage: IDBForageEntity | null) => void;
}

const MapInfoWindow: React.FC<IMapInfo> = ({ marker, setMarker }) => {
  const history = useHistory();
  const { updateModalUrl, disableModal, modalUrl, modal } = useModal();

  return (
    <>
      <Modal disableModal={disableModal} modalUrl={modalUrl} modal={modal} />

      <InfoWindow
        position={{ lat: marker.lat, lng: marker.lng }}
        onCloseClick={() => {
          setMarker(null);
        }}
      >
        <div className="max-w-xs">
          <h2 className="text-xl font-bold">Your {marker.name}</h2>
          <p>
            Added:{' '}
            {/* createdAt is a serverTimestamp when marker is not requeried from db */}
            {formatRelative(
              marker.createdAt.seconds
                ? new Date(marker.createdAt.seconds * 1000)
                : new Date(),
              new Date()
            )}
          </p>
          <div className="flex flex-wrap w-full justify-center mb-2">
            {marker.images &&
              marker.images.map((img) => {
                return (
                  <img
                    onClick={() => {
                      updateModalUrl(img);
                    }}
                    key={img}
                    style={{ maxWidth: '75px' }}
                    className="w-full mr-2"
                    src={img}
                    alt={marker.name}
                  />
                );
              })}
          </div>

          <button
            className="p-1 bg-blue-400 rounded-sm"
            onClick={() => {
              history.push('/forage', marker);
            }}
          >
            Add Image
          </button>
        </div>
      </InfoWindow>
    </>
  );
};

export default MapInfoWindow;
