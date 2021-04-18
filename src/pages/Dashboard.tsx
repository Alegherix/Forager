import React, { useEffect, useState } from 'react';
import { collectedForages } from '../auth/authOperations';
import BlueBerrySVG from '../components/svg/Blueberry';
import HeroSVG from '../components/svg/Hero';
import LingonSVG from '../components/svg/Lingon';
import { IDBForageEntity } from '../utils/interfaces';

const ForageCard = ({ name, Icon, amountFound, iconBgColor }) => {
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

  function getAmount(name: string) {
    return forages.filter((item) => item.name === name).length;
  }

  const forageEntities = [
    {
      name: 'Chantarelle',
      Icon: HeroSVG,
      amountFound: getAmount('Kantarell'),
      iconBgColor: '#D2A6FF',
    },
    {
      name: 'Lingon',
      Icon: LingonSVG,
      amountFound: getAmount('Lingon'),
      iconBgColor: '#93A8F0',
    },
    {
      name: 'Blueberry',
      Icon: BlueBerrySVG,
      amountFound: getAmount('Blueberry'),
      iconBgColor: '#93F0A8',
    },
  ];

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
