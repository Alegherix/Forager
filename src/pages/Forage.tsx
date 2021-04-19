import { formatRelative } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MapCard from '../components/MapCard';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import UploadForm from '../components/UploadForm';
import useModal from '../hooks/useModal';
import { IDBForageEntity } from '../utils/interfaces';

const Forage: React.FC = () => {
  // Redirect back if no props is passed to actually render
  const [forage, setForage] = useState<IDBForageEntity>();
  const history = useHistory();
  const location = useLocation();
  const { updateModalUrl, disableModal, modalUrl, modal } = useModal();

  useEffect(() => {
    if (!location.state) history.push('/');
    setForage(location.state);
  }, [history, location.state]);

  return (
    <>
      <Modal disableModal={disableModal} modalUrl={modalUrl} modal={modal} />
      <main className="bg-clouds min-h-screen pb-4">
        <Navbar />
        <section className="flex flex-col lg:flex-row max-w-screen-xl mx-auto justify-between">
          <div className="flex flex-col items-center p-2 mx-auto px-4 flex-1">
            <h1 className="text-2xl font-bold mb-2">
              Your {forage?.name} spot!
            </h1>
            <MapCard {...forage!} height={400} />
            <div className="mt-4">
              <p>
                You found some {forage?.name} here{' '}
                {formatRelative(
                  forage?.createdAt.seconds
                    ? new Date(forage.createdAt.seconds * 1000)
                    : new Date(),
                  new Date()
                )}
              </p>
            </div>
          </div>

          <section className="flex flex-col items-center p-2 mx-auto">
            {forage?.images && (
              <h2 className="text-xl font-bold mb-2 text-left">
                Your saved Images of this location
              </h2>
            )}
            <div className="flex flex-wrap justify-center max-w-xl">
              {forage?.images &&
                forage?.images.map((img) => {
                  return (
                    <img
                      onClick={() => {
                        updateModalUrl(img);
                      }}
                      key={img}
                      className="h-60 w-full md:w-40 md:h-40 max-w-xs rounded-md mr-4 mb-4 cursor-pointer"
                      src={img}
                      alt={forage.name}
                    />
                  );
                })}
            </div>
          </section>
        </section>
        <section className="flex flex-col p-2 mx-auto px-4 flex-1 max-w-screen-xl">
          <h2 className="text-2xl font-bold mb-2">Extra information</h2>
          <UploadForm id={forage?.id} />
        </section>
      </main>
    </>
  );
};

export default Forage;
