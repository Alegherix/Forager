import 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { collectedForages } from '../auth/authOperations';
import MapCard from '../components/MapCard';
import Navbar from '../components/Navbar';
import { forageEntitiesCollection } from '../utils/data';
import { IDBForageEntity, IForageCardComponent } from '../utils/interfaces';
import { useHistory } from 'react-router-dom';

const ForageCard: React.FunctionComponent<IForageCardComponent> = ({
  name,
  Icon,
  amountFound,
  iconBgColor,
}) => {
  return (
    <div className="marineTransition shadow-xl flex gap-4 rounded-md items-center py-6 px-2 mx-auto flex-wrap justify-center w-full max-w-md">
      <div
        style={{ background: `${iconBgColor}` }}
        className="w-28 h-28 p-4 rounded-md shadow-2xl"
      >
        <Icon />
      </div>
      <div className="text-yellow-50 w-60">
        <h2 className="text-5xl text-center font-bold mb-2">{amountFound}</h2>
        <p>{name} locations found and added</p>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [forages, setForages] = useState<IDBForageEntity[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const forages = await collectedForages();
      setForages(forages);
    }
    fetchData();
  }, []);

  // Sets the amount of found forages for each forageEntity
  const forageEntities = forageEntitiesCollection.map((entity) => {
    entity.amountFound = forages.filter(
      (item) => item.name === entity.name
    ).length;
    return { ...entity };
  });

  const lastEntities = forages
    .slice(Math.max(0, forages.length - 3), forages.length)
    .reverse();
  return (
    <>
      <main style={{ backgroundColor: '#D2D7F5' }} className="min-h-screen">
        <Navbar />
        <h2 className="max-w-screen-xl mx-auto text-3xl font-bold mb-4">
          Your total foraging count
        </h2>
        <div className="px-2 flex flex-col xl:flex-row gap-4 max-w-screen-xl mx-auto">
          {forageEntities.map((entity) => (
            <ForageCard key={entity.iconBgColor} {...entity} />
          ))}
        </div>
        <div className="max-w-screen-xl mx-auto mt-12">
          <h2 className="text-3xl px-2 font-bold">Last Found Locations</h2>
          <div className="grid ">
            {lastEntities.map((entity) => {
              return (
                <div key={entity.id} className="m-4">
                  <MapCard {...entity} height={300} />
                  <button
                    onClick={() => {
                      history.push('/forage', entity);
                    }}
                    className="my-4 mb-6 p-2 bg-blue-400 rounded-md"
                  >
                    Add Image to location
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
