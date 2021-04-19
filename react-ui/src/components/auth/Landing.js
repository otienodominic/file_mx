import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button, TextField } from '@material-ui/core';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useAuth } from './auth';

const AuthForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const { setUserName, setAuthToken, username } = useAuth();
  

  const authenticate = async () => {
    const basePath = '/api/login'; // server side path
    let url = basePath;
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({email, password})
    });

    const json = await response.json();
    console.log(json);
    if(response.ok) {
      setAuthToken(json.token);
      setUserName(json.user.name); // auth context provider.
    //   setEmail(json.user.email);
    } else {
      alert(json.msg);
    }
  }  

  const components = [
    <TextField
      placeholder="Email"
      name='email'
      value={email}
      onChange={(e) => setEmail(e.target.value)} />,
    <TextField
      placeholder="Password"
      name='password'
      type='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)} />,
    <Button
      variant='contained'  
      color='primary' 
      onClick={() => authenticate()}> Login     
    </Button>
  ]

  if(username) {
    return <Redirect to="/home" />
  }

  return (
    <Grid container direction='row' item xs={12} justify='center' alignItems='center' style={{height: '100%'}}>
      <Grid
        container
        direction='column'
        alignItems='stretch'
        justify='center'
        component={Card}
        item
        spacing={3}
        xs={8}
        md={4}
        style={{padding: '20px'}}
      >
        <Grid container item xs={12} justify='center'>
          <Typography variant='h3'>Login</Typography>
        </Grid>
        {
          components.map(component => {
            return (
              <Grid container item direction='column' xs={12} alignItems='stretch'>
                {component}
              </Grid>
            );
          })
        }     
           
            <Link to='/signup'>Don't have an account? Sign Up</Link>             
        
      </Grid>
    </Grid>
  )

}

export default withRouter(AuthForm);