import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UploadForm from '../components/UploadForm';
import { IDBForageEntity } from '../utils/interfaces';

const Forage: React.FC = () => {
  // Redirect back if no props is passed to actually render
  const [forage, setForage] = useState<IDBForageEntity>();

  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (!location.state) history.push('/');
    setForage(location.state);
  }, [history, location.state]);

  return (
    <>
      <main className="bg-clouds min-h-screen pb-4">
        <Navbar />
        <div className="flex justify-center flex-col text-center max-w-screen-xl mx-auto px-2">
          <h2 className="text-3xl font-bold mb-2 text-left">
            Your saved Images for this location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto">
            {forage?.images &&
              forage?.images.map((img) => {
                return (
                  <img
                    key={img}
                    className="w-80 h-80 max-w-xs rounded-md mr-4 mb-4"
                    src={img}
                    alt={forage.name}
                  />
                );
              })}
          </div>
          <section className="text-left mt-8">
            <h2 className="text-3xl font-bold mb-2">
              Upload an image of your location
            </h2>
            <UploadForm id={forage?.id} />
          </section>
        </div>
      </main>
    </>
  );
};

export default Forage;
