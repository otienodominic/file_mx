import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import AuthState from './context/authContext/authState'
import FileState from './context/fileContext/FileState'
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/pages/Home'
import UpdateFile from './components/pages/UpdateFile'


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
            <PrivateRoute exact path='/update/:id' component={UpdateFile}/>
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
