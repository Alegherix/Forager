import firebase from 'firebase/app';
import 'firebase/auth';

// Sätter upp Config objektet
const config = {
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

export default function initFireBase() {
  // Initializera om den ej är initializerad
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}
