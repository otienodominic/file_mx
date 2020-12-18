import React, { useEffect, useMemo, useContext, useState } from 'react';
import {
  Container,
  Card,  
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import TableContainer from './TableContainer';

import { SelectColumnFilter } from './Filters';
import AuthContext from '../../context/authContext/authContext'
import FileContext from '../../context/fileContext/FileContext'
import moment from 'moment'
import Button from '@material-ui/core/Button'
// import Button from 'react-bootstrap/Button';
import {useHistory, withRouter} from 'react-router-dom'
// import { update } from '../../../../server/models/userModel';



const FilesList = (props) => {
const history = useHistory()
  const context = useContext(FileContext)
  const { loading } = useContext(AuthContext)
  const { files, fileFilter, searchFile, getFiles } = context
  const { removeFile, edit_File, clearEdit, updateFile } = useContext(FileContext)
  
useEffect(() => {
  getFiles();    
}, []);

// if (files === null || files.length === 0) {
//   return <h3 className="no-guest">{loading ? 'Loading files...' : 'Please add a File'}</h3>
// }


const renderRowSubComponent = (row) => {
  const {  
    _id,       
    patientName,  
    phoneNumber,  
    dateOfBirth,  
    gender,        
    appointmentDate, 
    viralLoad,     
    isBooked
  } = row.original;
  const handleRemove = () => {
    removeFile(_id)
    clearEdit()
  }  

  // const file = {
  //   _id: '5fdc8249abc2e231304de5dc',
  //   appointmentDate: new Date('2020-12-25'),
  //   viralLoad: '25',
  //   isBooked: true
  // }

  const weka =()=>{
    console.log(_id)
    props.history.push('/update/'+_id)
    props.history.push({
      appointmentDate, 
      viralLoad,     
      isBooked
    })
  }
  
  return (
    <Card style={{ width: '30rem', margin: '0 auto'  }}>        
      <CardBody>
        <CardTitle>
        <strong>Patient Name: </strong> {patientName} <br />
        </CardTitle>
        <CardText>          
          <strong>Phone:</strong>{phoneNumber} <br />
          <strong>Age: </strong>  {(moment().diff(dateOfBirth, 'years', true)).toFixed(1)} <br />
          <strong>Gender:</strong>{gender} <br />
          <strong>Appointment Date:</strong>{appointmentDate} <br />
          <strong>Viral Load Result:</strong>{viralLoad} <br />
          <strong>Patient Booked? :</strong>{isBooked} <br />  
          <Button onClick={handleRemove} variant="contained" color="secondary" >Delete</Button>{'  '}
          <Button  color="primary" variant="contained" onClick={weka} >Issue Return Date</Button>    
        </CardText>
      </CardBody>
    </Card>
  );
};

const columns = useMemo(
  () => [
    {
      Header: () => null,
      id: 'expander', // 'id' is required
      Cell: ({ row }) => (
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? '👇' : '👉'}
        </span>
      ),
    },
    {
      Header: 'Patient Number',
      accessor: 'patientNumber',
      disableSortBy: true,
      Filter: SelectColumnFilter,
      filter: 'equals',
    },
    {
      Header: 'Patient Name',
      accessor: 'patientName',
      disableSortBy: true,
      Filter: SelectColumnFilter,
      filter: 'equals',
    },
    {
      Header: 'Phone Number',
      accessor: 'phoneNumber',
      filter: 'equals',
    },
    {
      Header: 'Appointment Date',
      accessor: 'appointmentDate',
    },
    {
      Header: 'Latest Viral Load',
      accessor: 'viralLoad',
    },      
  ],
  []
);

return (
  <Container style={{ marginTop: 100 }}>
    <TableContainer
      columns={columns}
      data={files}
      renderRowSubComponent={renderRowSubComponent}
    />
  </Container>
);
}
export default withRouter(FilesList)
