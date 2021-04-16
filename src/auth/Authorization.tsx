import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IDBForageEntity } from '../utils/interfaces';
import initFireBase from './initFirebase';

initFireBase();

const auth = firebase.auth();
const firestore = firebase.firestore();

const Authorization: React.FC = () => {
  const [user] = useAuthState(auth);

  CollectedForages();
  return (
    <div className="z-10 w-96 bg-red-500 h-32 absolute">
      {!user && <Login />}
      {user && (
        <>
          <Logout />
        </>
      )}
    </div>
  );
};

const Login = () => {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign in</button>;
};

const Logout = () => {
  return (
    <>
      {auth.currentUser && (
        <button onClick={() => auth.signOut()}>Sign Out</button>
      )}
    </>
  );
};

export function CollectedForages() {
  firestore
    .collection('forages')
    .where('uid', '==', auth.currentUser?.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
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

export default Authorization;
