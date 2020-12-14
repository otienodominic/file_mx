import React, { useContext } from 'react'
import FileContext from '../../context/fileContext/FileContext'

const FileItem = ({ file }) => {
  const { removeFile, edit_File, clearEdit, update_File } = useContext(FileContext)
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
    checkedOutBy,
    isBooked
} = file

  const handleRemove = () => {
    removeFile(_id)
    clearEdit()
  }
  const onchange = () => {
    update_File({ ...file, isBooked: !isBooked })
  }

  return (
    <div class="guest-card">
      <div class="card-head">
        <div >
          <label className={`${isBooked && 'confirm'}`}>Booked
            <i className={`fas fa-check-square ${isBooked && 'confirm'}`}><input type="checkbox" onChange={onchange} /> </i>
          </label>
        </div>
        <div>
          <button title="Edit File"><i class="fas fa-user-edit" onClick={() => edit_File(file)} ></i></button>
          <button onClick={handleRemove} title="Remove File"><i class="fas fa-trash-alt remove"></i></button>
        </div>
      </div>
      <div class="card-body">
        <h3>{patientName}</h3>
        <h2>{patientNumber}</h2>
        <span class={'badge ' + (viralLoad === '<400 copies' ? 'green' : viralLoad === '401-900' ? 'seaGreen' : 'red')}>{viralLoad}</span>
        <div class="contact">
          <i class="fas fa-phone-alt"></i>
          <p>{phoneNumber}</p>
        </div>
      </div>
    </div>
  )
}

export default FileItem
