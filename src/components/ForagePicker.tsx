import React, { useState } from 'react';
import forages from '../utils/data';
import { IForage, IForageSelector } from '../utils/interfaces';
import BlueBerrySVG from './svg/Blueberry';
import LingonSVG from './svg/Lingon';
import MushromSVG from './svg/Mushroom';

interface ForagePickerProps {
  setSelectedForage: any;
}

const ForageSelector: React.FunctionComponent<IForageSelector> = (forage) => {
  const { Icon } = forage;
  return (
    <div
      className="hover:border-purple-500 hover:bg-purple-300 border-4 border-white cursor-pointer p-2 rounded-md"
      onClick={() => forage.updateForage(forage)}
    >
      <Icon />
    </div>
  );
};

const SelectedForage: React.FC<IForage> = ({ Icon }) => {
  return (
    <div className="border-purple-500 border-4 p-2 rounded-md cursor-pointer">
      <Icon />
    </div>
  );
};

const ForagePicker: React.FC<ForagePickerProps> = ({ setSelectedForage }) => {
  const [forage, setForage] = useState<IForage>(forages[0]);
  const [expanded, setExpanded] = useState<Boolean>(false);

  const updateForage = (forage: IForage) => {
    setExpanded(!expanded);
    setForage(forage);
    setSelectedForage(forage);
  };

  return (
    <div
      className="z-10 absolute bottom-0 left-0 rounded-md bg-white"
      onClick={() => setExpanded(!expanded)}
    >
      {expanded && (
        <div className="flex gap-4 rounded-md">
          {forages.map((forage) => {
            return (
              <ForageSelector
                key={forage.name}
                updateForage={updateForage}
                {...forage}
              />
            );
          })}
        </div>
      )}
      {!expanded && <SelectedForage {...forage} />}
    </div>
  );
};

export default ForagePicker;
