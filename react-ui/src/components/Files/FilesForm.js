import React, { useState, useEffect} from 'react'
import { Grid, Card, Typography, Button, TextField } from '@material-ui/core';
import { useAuth } from '../auth/auth';
import { Link, withRouter, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

function FilesForm() {
  const history = useHistory()
  const {username} = useAuth();

  if(!username) {
    return <Redirect to="/login" />;
  }

  
  const handleSubmit =async(event)=> {
    const token = localStorage.getItem('token')
    const data = {
      patientNumber: event.target.patientName.value ,
      patientName: event.target.patientName.value,
      phoneNumber: event.target.phoneNumber.value,  
      age: event.target.age.value,
      gender: event.target.gender.value,
      viralLoad: event.target.viralLoad.value
    }
    const options = {
      headers: {
        'x-auth-token': token, 
      'Content-Type': 'application/json'
    }
    };

    axios.post('/api/create-file', data, options)
    .then(response => console.log(response))
    .catch((err) => console.log(err))
    .then(setTimeout(() => history.replace('/home'), 700) )

  }

  const sex = [
    {
        value: 'Male',
        label: '♂ Male'
    },
    {
        value: 'Female',
        label: '♀️ Female'
    }
]

  return (
    <div>
     <form onSubmit={handleSubmit}>
     <TextField
    id="patientNumber"
    name="patientNumber"
    variant="outlined"
    required
    fullWidth
   
    label="patient Number"
    autoFocus
    // value={patientNumber} 
    // onChange={onchange} 

    />
    <TextField
    variant="outlined"
    required
    fullWidth
    id="patientName"
    label="Patient Name"
    name="patientName"
    autoComplete="patientName"
    // value={file.patientName} 
    // onChange={onchange}
    />
    <TextField
    variant="outlined"
    required
    fullWidth
    name="phoneNumber"
    label="phoneNumber"
    type="phoneNumber"
    id="phoneNumber"
    autoComplete="current-password"
    // value={file.phoneNumber} 
    // onChange={onchange}
    />
    <TextField
    variant="outlined"
    required
    fullWidth
    name="age"
    label="Age in years"
    type="age"
    id="age"
    autoComplete="Age in years"
    // value={file.age} 
    // onChange={onchange}
    />
    <TextField
    id="gender"
    select
    label="Gender"
    name="gender"
    // value={file.gender}    
    helperText="Please select Gender"
    // onChange={onchange}
    >
     {
         sex.map((option)=>(
             <option key={option.value} value={option.value}>
                {option.label}
             </option>
         ))
     }   
    </TextField>
    
    <TextField
    variant="outlined"
    required
    fullWidth
    name="viralLoad"
    label="Batch Number"
    type="viralLoad"
    id="viralLoad"
    autoComplete="Batch-Number"
    // value={file.viralLoad} 
    // onChange={onchange}
    />
           <br />
           <button type='submit'> Submit </button>
           </form>
        <br />
        <button onClick={() => history.replace('/posts')}> Cancel </button>
    </div>
  )
}

export default FilesForm




// import React, { useState, useEffect } from 'react';
// import { Grid, Card, Typography, Button, TextField } from '@material-ui/core';
// import { Link, withRouter, Redirect, useHistory } from 'react-router-dom';
// import { useAuth } from '../auth/auth';
// import axios from 'axios'

// const FileForm = () => {
//   const history = useHistory()  
//   const { username } = useAuth();

//   // const [patienNumber, setPatienNumber] = useState('')
//   // const [patientName, setPatientName] = useState('')
//   // const [phoneNumber, setPhoneNumber] = useState('')
//   // const [age, setAge] = useState('')
//   // const [gender, setGender] = useState('')
//   // const [viralLoad, setViralLoad] = useState('')
  

//   const [file, setFile] = useState({
//     patientNumber: '', 
//     patientName: '',          
//     phoneNumber: '', 
//     age: '',        
//     gender: '',
//     viralLoad: '',
// })
// const { 
//   patientNumber, 
//   patientName,
//   phoneNumber,  
//   age,  
//   gender, 
//   viralLoad} = file

//   const onchange = (e) => {
//     setFile({
//       ...file,
//       [e.target.name]: e.target.value
//     })
//   }
      
//   const save = async(file) => {    
//     const url = '/api/create-file'
//     let reqBody = JSON.stringify({
        // patientNumber, 
        // patientName,
        // phoneNumber,  
        // age,  
        // gender, 
        // viralLoad
//     })

//     const response = await fetch(url, {
//       method: 'post',
//       headers: {
//         'content-type': 'application/json',
//         'x-auth-token': localStorage.getItem('token')
//       },
//       body: reqBody
//     });

//     const json = await response.json();
//     // setFile(json)

//   }

//   const onsubmit = (e) => {
//     e.preventDefault();    
//     save(file);    
//     setFile({
//       patientNumber: '', 
//         patientName: '',          
//         phoneNumber: '', 
//         age: '',        
//         gender: '',
//         viralLoad: '',
//     })
//   }

  
  // if(!username) {
  //   return <Redirect to="/login" />;
  // }
  
  // const sex = [
  //     {
  //         value: 'Male',
  //         label: '♂ Male'
  //     },
  //     {
  //         value: 'Female',
  //         label: '♀️ Female'
  //     }
  // ]
 

//   const components = [
    // <TextField
    // autoComplete="patientNumber"
    // name="patientNumber"
    // variant="outlined"
    // required
    // fullWidth
    // id="patientNumber"
    // label="patient Number"
    // autoFocus
    // value={patientNumber} 
    // onChange={onchange} 

    // />,
    // <TextField
    // variant="outlined"
    // required
    // fullWidth
    // id="patientName"
    // label="Patient Name"
    // name="patientName"
    // autoComplete="patientName"
    // // value={file.patientName} 
    // onChange={onchange}
    // />,
    // <TextField
    // variant="outlined"
    // required
    // fullWidth
    // name="phoneNumber"
    // label="phoneNumber"
    // type="phoneNumber"
    // id="phoneNumber"
    // autoComplete="current-password"
    // // value={file.phoneNumber} 
    // onChange={onchange}
    // />,
    // <TextField
    // variant="outlined"
    // required
    // fullWidth
    // name="age"
    // label="Age in years"
    // type="age"
    // id="age"
    // autoComplete="Age in years"
    // // value={file.age} 
    // onChange={onchange}
    // />,
    // <TextField
    // id="standard-select-currency"
    // select
    // label="Gender"
    // // value={file.gender}    
    // helperText="Please select Gender"
    // onChange={onchange}
    // >
    //  {
    //      sex.map((option)=>(
    //          <option key={option.value} value={option.value}>
    //             {option.label}
    //          </option>
    //      ))
    //  }   
    // </TextField>
    // ,
    // <TextField
    // variant="outlined"
    // required
    // fullWidth
    // name="viralLoad"
    // label="Batch Number"
    // type="viralLoad"
    // id="viralLoad"
    // autoComplete="Batch-Number"
    // // value={file.viralLoad} 
    // onChange={onchange}
    // />
//     ,
//     <Button
//       variant='contained' 
//       color='primary' 
//       onClick={() => save(file)}>
//       Save Patient
//     </Button>
//   ]
 

//   return (
//     <Grid container direction='row' item xs={24} justify='center' alignItems='center' style={{height: '100%',padding: '2em'}}>
//       <Grid
//         container
//         direction='column'
//         alignItems='stretch'
//         justify='center'
//         component={Card}
//         item
//         spacing={3}
//         xs={8}
//         md={4}
//         style={{padding: '20px'}}
//       >
//         <Grid container item xs={12} justify='center'>
//           <Typography variant='h3'>Add patient</Typography>
//         </Grid>
//         {
//           components.map(component => {
//             return (
//               <Grid container item direction='column' xs={12} alignItems='stretch'>
//                 {component}
//               </Grid>
//             );
//           })
//         }   
        
//       </Grid>
//     </Grid>
//   )

// }

// export default withRouter(FileForm);