import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
// import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
// import GuestState from './comtext/guestContext/GuestState'
import AuthState from './context/authContext/authState'
import FileState from './context/fileContext/FileState'
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/pages/Home'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
if (localStorage.user) {
  setAuthToken(localStorage.user);
}

function App() {
  return (
    <AuthState>
      <FileState>
        <Router>
          <div>
            <Navbar />
            <Switch>
            <PrivateRoute exact path='/' component={Home} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </Router>
      </FileState>
    </AuthState>
  );
}
export default App;
