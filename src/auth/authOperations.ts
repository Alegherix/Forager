import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { IDBForageEntity } from '../utils/interfaces';
import initFireBase from './initFirebase';

initFireBase();
const firestore = firebase.firestore();
const auth = firebase.auth();

export function CollectedForages() {
  firestore
    .collection('forages')
    .where('uid', '==', auth.currentUser?.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });
}

export const saveToDatabase = async (props: IDBForageEntity) => {
  if (!auth.currentUser) return;
  const { uid } = auth.currentUser;
  const { lat, lng, name } = props;

  await firestore.collection('forages').add({
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    lat,
    lng,
    name,
    uid,
  });
};
