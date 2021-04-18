//Shares common properties between Forage objects
export interface IForageBase {
  name: string;
  url: string;
}

// Used for displaying Forage entities in UI
export interface UIForage extends IForageBase {
  Icon: React.FunctionComponent;
}

// Used for passing down setFunction to sync state between map and UI Picker
export interface IForageSelector extends UIForage {
  updateForage: (forage: UIForage) => void;
}

// Used in writing to db, and to hide complexity of fetching uid & servertime
export interface IForagePartial extends IForageBase {
  lat: number;
  lng: number;
}

// Primary Interface used to fetch Forage Entities from database
export interface IDBForageEntity extends IForagePartial {
  createdAt: any;
}

// Used for rendering Card components and for being able to separate data from implementation
export interface IForageCardComponent {
  name: string;
  Icon: React.FunctionComponent;
  amountFound: number;
  iconBgColor: string;
}
