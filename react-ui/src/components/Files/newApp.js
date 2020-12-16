import React, { useEffect, useState, useMemo, useContext } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import TableContainer from './TableContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SelectColumnFilter } from './filters';
import AuthContext from '../../context/authContext/authContext'
import FileContext from '../../context/fileContext/FileContext'
import moment from 'moment'


const App = () => {

    const context = useContext(FileContext)
    const { loading } = useContext(AuthContext)
    const { files, fileFilter, searchFile, getFiles } = context
    const { removeFile, edit_File, clearEdit, updateFile } = useContext(FileContext)

  
  useEffect(() => {
    getFiles();   
    console.log(files) 
  }, []);

  if (files === null || files.length === 0) {
    return <h3 className="no-guest">{loading ? 'Loading files...' : 'Please add a File'}</h3>
  }

  const renderRowSubComponent = (row) => {
    const {      
      patientNumber,  
      patientName,  
      phoneNumber,  
      dateOfBirth,  
      gender,        
      appointmentDate, 
      viralLoad,     
      isBooked
    } = row.original;
    return (
      <Card style={{ width: '18rem', margin: '0 auto' }}>        
        <CardBody>
          <CardTitle>
            <strong>{`${patientNumber}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Patient Name: </strong>: {patientName} <br />
            <strong>Phone:</strong>{phoneNumber} <br />
            <strong>Age: </strong>: {(moment().diff(dateOfBirth, 'years', true)).toFixed(1)} <br />
            <strong>Gender:</strong>{gender} <br />
            <strong>Appointment Date:</strong>{appointmentDate} <br />
            <strong>Viral Load Result:</strong>{viralLoad} <br />
            <strong>Patient Booked? :</strong>{isBooked} <br />            
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
        disableSortBy: false,
        Filter: SelectColumnFilter,
        filter: 'equals',
      },
      {
        Header: 'Patient Name',
        accessor: 'patientName',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
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
};

export default App;