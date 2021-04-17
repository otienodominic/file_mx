import React, {useState} from 'react'
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from './components/pages/Home';
import { AuthContext } from './components/auth/auth';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomAppBar from './components/appbar/AppBar';
import PrivateRoute from './components/route_types/PrivateRoute';


function App() {  
  const existingToken = localStorage.getItem("token") || "";
  const existingUsername = localStorage.getItem("user") || "";
  const [ authToken, setAuthToken ] = useState(existingToken);
  const [ username, setUsername ] = useState(existingUsername);


  const setUserName = (data) => {
    if(!data) {
      localStorage.removeItem('user');
      setUsername();
    } else {
      localStorage.setItem('user', data);
      setUsername(data);
    }
  }

  const setToken = (data) => {
    if(!data) {
      localStorage.removeItem('token');
      setAuthToken();
    } else {
      localStorage.setItem('token', JSON.stringify(data));
      setAuthToken(data);
    }
  }

  return (
    <AuthContext.Provider value={{authToken, setAuthToken: setToken, username, setUserName: setUserName}}>
      <div className='App'>
        <Router>
          <CustomAppBar/>
          <Switch>
            {/* <Route exact path="/" component={AuthForm} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <PrivateRoute exact path="/home" component={HomePage} />            
          </Switch>
        </Router>
       </div>
    </AuthContext.Provider>
  )
}

export default App







