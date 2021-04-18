import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react';
import firebase from '../auth/authOperations';

interface IAuthContext {
  user: firebase.User | null;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

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
