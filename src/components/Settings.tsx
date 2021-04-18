import React from 'react';
import MapUIComponent from './MapUIComponent';
import SettingsSVG from './svg/Settings';
import { useHistory } from 'react-router-dom';

const Settings: React.FC = () => {
  const history = useHistory();
  return (
    <MapUIComponent
      Icon={SettingsSVG}
      bottomOfset={20}
      callback={() => history.push('/dashboard')}
    />
  );
};

export default Settings;
