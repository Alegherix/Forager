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
  }, []);

  return (
    <>
      <main>
        <Navbar />
        <div className=" mx-auto flex justify-center flex-col text-center">
          <p>{JSON.stringify(forage)}</p>
          <h1>{forage?.name}</h1>
          <p>Lat: {forage?.lat}</p>
          <p>Lng: {forage?.lng}</p>
          {forage?.images && (
            <img
              width={100}
              height={100}
              src={forage?.images[0]}
              alt={forage.name}
            />
          )}

          <UploadForm id={forage?.id} />
        </div>
      </main>
    </>
  );
};

export default Forage;
