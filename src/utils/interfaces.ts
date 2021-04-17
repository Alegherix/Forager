export interface IForageBase {
  name: string;
  url: string;
}

export interface UIForage extends IForageBase {
  Icon: React.FunctionComponent;
}

export interface IForagePartial extends IForageBase {
  lat: number;
  lng: number;
}

export interface IDBForageEntity extends IForagePartial {
  createdAt: any;
}

export interface IForageSelector extends UIForage {
  updateForage: (forage: UIForage) => void;
}
