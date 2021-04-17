import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FirebaseAuth from './auth/FirebaseAuth';
import ForageMap from './components/ForageMap';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './hooks/useAuth';

const App: React.FC = () => {
  return (
    <>
      <main>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={ForageMap} />
              <Route path="/signin" component={FirebaseAuth} />
            </Switch>
          </AuthProvider>
        </Router>
      </main>
    </>
  );
};

export default App;
