import firebase from 'firebase/app';
import 'firebase/auth';
import { FunctionComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import HeroSVG from '../components/svg/Hero';

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',

  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
  ],
};

const FirebaseAuth: FunctionComponent = () => {
  return (
    <main className="h-screen w-screen bg-green-100 flex items-center justify-center">
      <div className="max-w-lg mx-auto flex flex-col justify-center">
        <div className="mb-4">
          <h1 className="text-5xl text-purple-700 font-bold text-center mb-2">
            Welcome to Forager
          </h1>
          <div className="w-60 h-60 flex items-center justify-center mx-auto">
            <HeroSVG />
          </div>
        </div>
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </main>
  );
};

export default FirebaseAuth;
