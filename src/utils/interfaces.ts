export interface IForage {
  name: string;
  Icon: React.FunctionComponent;
  url: string;
}

export interface IForageSelector extends IForage {
  updateForage: (forage: IForage) => void;
}

export interface IMarker {
  lat: number;
  lng: number;
  time: Date;
  selectedForage: IForage;
}
