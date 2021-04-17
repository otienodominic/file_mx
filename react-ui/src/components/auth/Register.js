import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button, TextField } from '@material-ui/core';
import { Link, withRouter, Redirect, useHistory } from 'react-router-dom';


const AuthForm = (props) => {
  const history = useHistory()  

  // Handle local errors
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  
  const authenticate = async () => {
    setMessage("");
    setSuccessful(false);
    const basePath = '/api/register'; // server side path
    let url = basePath;
    console.log(url);    

    const response = await fetch(url, {
      method: "POST",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({name, email, password, passwordCheck})
    });

    const json = await response.json();
    console.log(json);
    if(response.ok) {
        // setMessage('Successfully Register');
        setSuccessful(true);
        history.push('/login')
    } else {
      const resMessage = json.msg  
      alert(resMessage);
      setMessage(resMessage);
      setSuccessful(false);
    }
  }  

  const components = [
    <TextField
    autoComplete="name"
    name="name"
    variant="outlined"
    required
    fullWidth
    id="Name"
    label="Full Name"
    autoFocus
    value={name} 
    onChange={(e) => setName(e.target.value)} 

    />,
    <TextField
    variant="outlined"
    required
    fullWidth
    id="email"
    label="Email Address"
    name="email"
    autoComplete="email"
    value={email} 
    onChange={(e) => setEmail(e.target.value)}
    />,
    <TextField
    variant="outlined"
    required
    fullWidth
    name="password"
    label="Password"
    type="password"
    id="password"
    autoComplete="current-password"
    value={password} 
    onChange={(e)=> setPassword(e.target.value)}
    />,
    <TextField
    variant="outlined"
    required
    fullWidth
    name="passwordCheck"
    label="Re-type Password"
    type="password"
    id="passwordCheck"
    autoComplete="current-password2"
    value={passwordCheck} 
    onChange={(e)=>setPasswordCheck(e.target.value)}
    />
    ,
    <Button
      variant='contained' 
      color='primary' 
      onClick={() => authenticate()}>
      Register
    </Button>
  ]
 

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
          <Typography variant='h3'>Register</Typography>
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
        <Link to='/login'>Already Have An Account? Sign In</Link>
      </Grid>
    </Grid>
  )

}

export default withRouter(AuthForm);