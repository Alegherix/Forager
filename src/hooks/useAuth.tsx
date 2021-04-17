import firebase from 'firebase/app';
import 'firebase/auth';
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import initFirebase from '../auth/initFirebase';

// Gör callet för att faktiskt initializera Firebase
initFirebase();

interface IAuthContext {
  user: firebase.User | null;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  // Skapar en useState hoook där vi antigen har en firebase user eller null,
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  // Skapar signout funktionen
  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        setUser(user);
        setLoading(false);
      });

    return () => {
      cancelAuthListener();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Sätter upp en Custom hook så att vi på alla ställen vi vill kunna få tillgång till användaren, logout funktionen eller om de är authenticated
export function useAuth() {
  return useContext(AuthContext);
}
