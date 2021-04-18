import React, { useEffect, useState } from 'react';
import { collectedForages } from '../auth/authOperations';
import { forageEntitiesCollection } from '../utils/data';
import { IDBForageEntity, IForageCardComponent } from '../utils/interfaces';

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
      <div className="text-yellow-50 w-64">
        <h2 className="text-5xl text-center font-bold">{amountFound}</h2>
        <p>{name} locations found and added</p>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [forages, setForages] = useState<IDBForageEntity[]>([]);

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

  return (
    <>
      <main
        style={{ backgroundColor: '#D2D7F5', fontFamily: 'Roboto' }}
        className="h-screen "
      >
        <div className="px-2 flex flex-col justify-center gap-4">
          {forageEntities.map((entity) => (
            <ForageCard key={entity.iconBgColor} {...entity} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
