import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FirebaseAuth from './pages/FirebaseAuth';
import ForageMap from './pages/ForageMap';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './hooks/useAuth';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <>
      <main>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={ForageMap} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/signin" component={FirebaseAuth} />
            </Switch>
          </AuthProvider>
        </Router>
      </main>
    </>
  );
};

export default App;
