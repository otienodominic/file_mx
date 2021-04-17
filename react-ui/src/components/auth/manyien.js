import React, { useState, useEffect } from 'react';
import { Grid, Card, Typography, Button, TextField } from '@material-ui/core';
import { Link, withRouter, Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../auth/auth';

const FileForm = (props) => {
  const history = useHistory()  

  // Handle local errors
  const [gender, setGender] = useState('');
  const [age, setAge] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  
  const authenticate = async () => {    
    const basePath = '/api/create-file'; // server side path
    let url = basePath;
    console.log(url);    

    const response = await fetch(url, {
      method: "POST",
      headers: {'content-type': 'application/json',
      'x-auth-token': localStorage.getItem('token')
    },
      body: JSON.stringify({
            patientNumber, 
            patientName,          
            phoneNumber, 
            age,        
            gender})
    });

    const json = await response.json();
    console.log(json);
    if(response.ok) {
        // setMessage('Successfully Register');
        // setSuccessful(true);
        history.push('/home')
    } else {
      const resMessage = json.msg  
      alert(resMessage);
    //   setMessage(resMessage);
    //   setSuccessful(false);
    }
  }  

  const components = [
    <TextField
    autoComplete="patientNumber"
    name="patientNumber"
    variant="outlined"
    required
    fullWidth
    id="patientNumber"
    label="patient Number"
    autoFocus
    value={patientNumber} 
    onChange={(e) => setPatientNumber(e.target.value)} 

    />,
    <TextField
    variant="outlined"
    required
    fullWidth
    id="patientName"
    label="Patient Name"
    name="patientName"
    autoComplete="patientName"
    value={patientName} 
    onChange={(e) => setPatientName(e.target.value)}
    />,
    <TextField
    variant="outlined"
    required
    fullWidth
    name="phoneNumber"
    label="phoneNumber"
    type="phoneNumber"
    id="phoneNumber"
    autoComplete="current-password"
    value={phoneNumber} 
    onChange={(e)=> setPhoneNumber(e.target.value)}
    />,
    <TextField
    variant="outlined"
    required
    fullWidth
    name="age"
    label="Age in years"
    type="age"
    id="age"
    autoComplete="Age in years"
    value={age} 
    onChange={(e)=>setAge(e.target.value)}
    />,
    <TextField
    variant="outlined"
    required
    fullWidth
    name="gender"
    label="gender"
    type="gender"
    id="gender"
    autoComplete="gender"
    value={gender} 
    onChange={(e)=>setGender(e.target.value)}
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
          <Typography variant='h3'>Add patient</Typography>
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
        
      </Grid>
    </Grid>
  )

}

export default withRouter(AuthForm);