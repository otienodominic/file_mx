import React, { useContext, useState, useEffect } from 'react'
import FileContext from '../../context/fileContext/FileContext'

const FileForm = () => {
  const context = useContext(FileContext)
  const { addFile, editFile, clearEdit, update_File } = context
  const [file, setFile] = useState({
    patientNumber: '',  
    patientName: '',  
    phoneNumber: '',  
    dateOfBirth: '',  
    gender: '',
  })
  
  useEffect(() => {
    if (editFile !== null) {
      setFile(editFile)
    } else {
      setFile({
        patientNumber: '',  
        patientName: '',  
        phoneNumber: '',  
        dateOfBirth: '',  
        gender: '',
      })
    }
  }, [editFile, context])

  
  const { 
        patientNumber,  
        patientName,  
        phoneNumber,  
        dateOfBirth,  
        gender 
    } = file

  const onchange = (e) => {
    setFile({
      ...file,
      [e.target.name]: e.target.value
    })
  }
  const onsubmit = (e) => {
    e.preventDefault();
    if (editFile === null) {
      addFile(file);

    } else {
      update_File(file)
      clearEdit()
    }
    setFile({
        patientNumber: '',  
        patientName: '',  
        phoneNumber: '',  
        dateOfBirth: '',  
        gender: '',
    })
  }
  return (

    <div className="invite-section">
      <h1>{editFile !== null ? 'Edit Patient' : 'Register Patient'}</h1>
      <form onSubmit={onsubmit} >
        <input type="text" placeholder="Patient Number" name="name" value={patientNumber} onChange={onchange} required />
        <input type="text" placeholder="Patient Name" name="phone" value={patientName} onChange={onchange} required />
        <input type="text" placeholder="Phone" name="name" value={phoneNumber} onChange={onchange} required />
        <input type="text" placeholder="DOB" name="phone" value={dateOfBirth} onChange={onchange} required />        
        <p className="options-label">
          Gender</p>
        <div className="options">
          <label class="container">Female
          <input type="radio" name="diet" value="Female" onChange={onchange} checked={gender === "Female"} />
            <span class="checkmark"></span>
          </label>
          <label class="container">Male
          <input type="radio" name="diet" value="Male" onChange={onchange} checked={gender === "Male"} />
            <span class="checkmark"></span>
          </label>
          {/* <label class="container">Pescatarian
          <input type="radio" name="diet" value="Pescatarian" onChange={onchange} checked={diet === "Pescatarian"} />
            <span class="checkmark"></span>
          </label> */}
        </div>
        <input type="submit" value={editFile !== null ? 'Update Guest' : 'Add Guest'} className="btn" />
        {editFile !== null ? < input onClick={clearEdit} type="button" className="btn clear" value="Cancel" /> : null}
      </form>

    </div>
  )
}

export default FileForm



