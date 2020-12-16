import React, { useContext } from 'react'
import FileContext from '../../context/fileContext/FileContext'
import moment from 'moment'

const FileItem = ({ file }) => {
  const { removeFile, edit_File, clearEdit, updateFile } = useContext(FileContext)
  const {
      _id,
    patientNumber,  
    patientName,  
    phoneNumber,  
    dateOfBirth,  
    // gender, 
    // visitDate, 
    // appointmentDate, 
    viralLoad, 
    // checkedOutBy,
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
    <div class="guest-card">
      <div class="card-head">
        <div >
          <label className={`${isBooked && 'book'}`}>Booked
            <i className={`fas fa-check-square ${isBooked && 'book'}`}><input type="checkbox" onChange={onchange} /> </i>
          </label>
        </div>
        <div>
          <button title="Edit File"><i class="fas fa-user-edit" onClick={() => edit_File(file)} ></i></button>
          <button onClick={handleRemove} title="Remove File"><i class="fas fa-trash-alt remove"></i></button>
        </div>
      </div>
      <div class="card-body">
        <h3>Name: {patientName}</h3>
        <h2>IPNo: {patientNumber}</h2>
        <h3>Age: {moment().diff(moment(dateOfBirth), 'years')}</h3>
        <span class={'badge ' + (viralLoad === '<400 copies' ? 'red' : viralLoad === '401-999' ? 'seaGreen' : 'green')}>{viralLoad}</span>
        <div class="contact">
          <i class="fas fa-phone-alt"></i>
          <p>{phoneNumber}</p>
        </div>
      </div>
    </div>
  )
}

export default FileItem
