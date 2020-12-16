import React, { useEffect, useMemo, useContext } from 'react';
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
import Button from 'react-bootstrap/Button';


const FilesList = () => {

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
          <Button  variant="primary">Update</Button>{' '}
           <Button onClick={handleRemove} variant="danger">Del</Button>          
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
export default FilesList
