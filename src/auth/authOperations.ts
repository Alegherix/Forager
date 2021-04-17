import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { IDBForageEntity, IForagePartial } from './../utils/interfaces';
import initFireBase from './initFirebase';

initFireBase();
const firestore = firebase.firestore();
const auth = firebase.auth();

export function collectedForages() {
  return firestore
    .collection('forages')
    .where('uid', '==', auth.currentUser?.uid)
    .get()
    .then((querySnapshot) => {
      const temp: IDBForageEntity[] = [];
      querySnapshot.forEach((doc) => {
        const { lat, lng, name, url, createdAt } = doc.data();
        const forageEntity: IDBForageEntity = {
          lat,
          lng,
          name,
          url,
          createdAt,
        };
        temp.push(forageEntity);
      });
      return temp;
    });
}

export const saveToDatabase = async ({
  lat,
  lng,
  name,
  url,
}: IForagePartial) => {
  if (!auth.currentUser) return;
  const { uid } = auth.currentUser;
  await firestore.collection('forages').add({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    lat,
    lng,
    name,
    uid,
    url,
  });
};
