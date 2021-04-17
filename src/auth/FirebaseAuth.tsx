import firebase from 'firebase/app';
import 'firebase/auth';
import { FunctionComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
    <main className="h-screen w-screen bg-blue-200 flex items-center justify-center">
      <div className="max-w-lg mx-auto flex flex-col justify-center">
        <div>
          <h1 className="text-3xl text-purple-700 font-bold text-center">
            Welcome to Forager
          </h1>
        </div>
        <StyledFirebaseAuth
          className="mt-0 pt-0"
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </main>
  );
};

export default FirebaseAuth;
