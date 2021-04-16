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
  createdAt: Date;
  selectedForage: IForage;
}

export interface IDBForageEntity {
  lat: number;
  lng: number;
  name: string;
}
