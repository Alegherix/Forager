import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signin from './pages/Signin';
import ForageMap from './pages/ForageMap';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './hooks/useAuth';
import Dashboard from './pages/Dashboard';
import Forage from './pages/Forage';

const App: React.FC = () => {
  return (
    <>
      <main>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={ForageMap} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/forage" component={Forage} />
              <Route path="/signin" component={Signin} />
            </Switch>
          </AuthProvider>
        </Router>
      </main>
    </>
  );
};

export default App;
