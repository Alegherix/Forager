import React, { useState } from 'react';
import styled from 'styled-components';
import BlueBerrySVG from './svg/Blueberry';
import LingonSVG from './svg/Lingon';
import MushromSVG from './svg/Mushroom';

interface ForagePickerProps {}

const ForageContainer = styled.div`
  z-index: 2;
  position: absolute;
  bottom: -2px;
  left: -2px;
  background-color: white;
  padding: 0.7rem;
  border-radius: 10px;
`;

interface IForage {
  name: string;
  Icon: React.FunctionComponent;
}

const forages: IForage[] = [
  {
    name: 'Kantarell',
    Icon: MushromSVG,
  },
  {
    name: 'Lingon',
    Icon: LingonSVG,
  },
  {
    name: 'Blåbär',
    Icon: BlueBerrySVG,
  },
];

const ForagePicker: React.FC<ForagePickerProps> = ({}) => {
  const [forage, setForage] = useState<IForage>(forages[0]);
  const [expanded, setExpanded] = useState<Boolean>(false);

  return (
    <ForageContainer onClick={() => setExpanded(!expanded)}>
      {expanded && (
        <div>
          {forages.map((Forage) => {
            return <Forage.Icon />;
          })}
        </div>
      )}
      {!expanded && forage && <forage.Icon />}
    </ForageContainer>
  );
};

export default ForagePicker;
