import React, { useContext } from 'react'
import FileContext from '../../context/fileContext/FileContext'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import moment from 'moment'

const FileItem = ({ file }) => {
  const { removeFile, edit_File, clearEdit, updateFile } = useContext(FileContext)
  const {
      _id,
    patientNumber,  
    patientName,  
    phoneNumber,  
    dateOfBirth,  
    gender, 
    visitDate, 
    appointmentDate, 
    viralLoad, 
    checkedOutBy: {name},
    checkedInBy: {name},
    isBooked
} = file

  const handleRemove = () => {
    removeFile(_id)
    clearEdit()
  }
  const onchange = () => {
    updateFile({ ...file, isBooked: !isBooked })
  }

  return (
      <div className='App'>
        <Container>
        <Row>
              <Col>
                <h3>
                  Bio List
                 </h3>
              </Col>
            </Row>
            <Row>
              <Col>
                 <Table striped bordered hover>
                   <thead>
                     <tr>
                       <th>patientName</th>
                       <th>patientNumber</th>
                       <th>Phone</th>
                       <th>Age</th>
                       <th>Gender</th>
                       <th>Appointment Date</th>
                       <th>Visit Date</th>
                       <th>Viral Load</th>                       
                     </tr>
                   </thead>
                   <tbody>                     
                        <tr >
                          <td>{patientName}</td>
                          <td>{patientNumber}</td>
                          <td>{phoneNumber}</td>
                          <td>{(moment().diff(dateOfBirth, 'years', true)).toFixed(1)}</td>
                          <td>{gender}</td>
                          <td>{appointmentDate}</td>
                          <td>{visitDate}</td>
                          <td>{viralLoad}</td>
                       <td>
                       <Button  variant="primary">Edit</Button>{' '}
                       <Button onClick={handleRemove} variant="danger">Del</Button>
                       </td>
                      </tr>
                      
                   </tbody>
                 </Table>
              </Col>
            </Row>        
        
        </Container>
      </div>    
  )
}

export default FileItem
