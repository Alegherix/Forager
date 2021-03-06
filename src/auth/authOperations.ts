import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { IDBForageEntity, IForagePartial } from './../utils/interfaces';

// Sätter upp Config objektet
const config = {
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

// Initializera om den ej är initializerad
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();
const auth = firebase.auth();

export function collectedForages(): Promise<IDBForageEntity[]> {
  return firestore
    .collection('forages')
    .where('uid', '==', auth.currentUser?.uid)
    .orderBy('createdAt')
    .get()
    .then((querySnapshot) => {
      const temp: IDBForageEntity[] = [];
      querySnapshot.forEach((doc) => {
        const { lat, lng, name, url, createdAt, images } = doc.data();
        const forageEntity: IDBForageEntity = {
          lat,
          lng,
          name,
          url,
          createdAt,
          id: doc.id,
          images,
        };
        temp.push(forageEntity);
      });
      return temp;
    });
}

export async function getForage(id: string): Promise<IDBForageEntity> {
  const docRef = await firestore.collection('forages').doc(id);
  return docRef.get().then((doc) => {
    const {
      lat,
      lng,
      name,
      url,
      createdAt,
      images,
    } = doc.data() as IDBForageEntity;
    return {
      lat,
      lng,
      name,
      url,
      createdAt,
      id: docRef.id,
      images,
    };
  });
}

export const saveToDatabase = async ({
  lat,
  lng,
  name,
  url,
}: IForagePartial): Promise<string> => {
  if (!auth.currentUser) return 'Invalid user';
  const { uid } = auth.currentUser;
  const res = await firestore.collection('forages').add({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    lat,
    lng,
    name,
    uid,
    url,
  });
  return res.id;
};

export const saveImageToForage = async (imageUrl: string, id: string) => {
  if (!auth.currentUser) return;
  const forageRef = firestore.collection('forages').doc(id);
  await forageRef.update({
    images: firebase.firestore.FieldValue.arrayUnion(imageUrl),
  });
};

export { firestore, auth, firebase as default };
