import React, { useState } from 'react';
import forages from '../utils/data';
import { IForageSelector, UIForage } from '../utils/interfaces';
import MapUIComponent from './MapUIComponent';

interface ForagePickerProps {
  setSelectedForage: (forage: UIForage) => void;
}

const ForageSelector: React.FunctionComponent<IForageSelector> = (forage) => {
  const { Icon } = forage;
  return (
    <div
      style={{ width: '74px', height: '74px' }}
      className="hover:border-purple-500 hover:bg-purple-300 border-4 border-white cursor-pointer p-2 rounded-md"
      onClick={() => forage.updateForage(forage)}
    >
      <Icon />
    </div>
  );
};

const SelectedForage: React.FC<UIForage> = ({ Icon }) => (
  <MapUIComponent Icon={Icon} bottomOfset={0} />
);

const ForagePicker: React.FC<ForagePickerProps> = ({ setSelectedForage }) => {
  const [forage, setForage] = useState<UIForage>(forages[0]);
  const [expanded, setExpanded] = useState<Boolean>(false);

  const updateForage = (forage: UIForage) => {
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
        <>
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
        </>
      )}
      {!expanded && <SelectedForage {...forage} />}
    </div>
  );
};

export default ForagePicker;
