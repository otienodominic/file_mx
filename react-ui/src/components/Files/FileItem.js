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




    // <div class="guest-card">
    //   <div class="card-head">
    //     <div >
    //       <label className={`${isBooked && 'book'}`}>Booked
    //         <i className={`fas fa-check-square ${isBooked && 'book'}`}><input type="checkbox" onChange={onchange} /> </i>
    //       </label>
    //     </div>
    //     <div>
    //       <button title="Edit File"><i class="fas fa-user-edit" onClick={() => edit_File(file)} ></i></button>
    //       <button onClick={handleRemove} title="Remove File"><i class="fas fa-trash-alt remove"></i></button>
    //     </div>
    //   </div>
    //   <div class="card-body">
    //     <h3>Name: {patientName}</h3>
    //     <h2>IPNo: {patientNumber}</h2>
    //     <h3>Age: {moment().diff(moment(dateOfBirth), 'years')}</h3>
    //     <span class={'badge ' + (viralLoad === '<400 copies' ? 'red' : viralLoad === '401-999' ? 'seaGreen' : 'green')}>{viralLoad}</span>
    //     <div class="contact">
    //       <i class="fas fa-phone-alt"></i>
    //       <p>{phoneNumber}</p>
    //     </div>
    //   </div>
    // </div>
  )
}

export default FileItem
