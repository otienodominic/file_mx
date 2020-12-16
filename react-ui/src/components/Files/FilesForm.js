import React, { useContext, useState, useEffect } from 'react'
import FileContext from '../../context/fileContext/FileContext'



const FileForm = () => {  
  const context = useContext(FileContext)
  const { addFile, editFile, clearEdit, updateFile } = context  
  
  useEffect(() => {
    if (editFile !== null) {
      setFile(editFile)
    } else {
      setFile({
        patientNumber: '', 
        patientName: '',          
        phoneNumber: '', 
        dateOfBirth: new Date(),        
        gender: '',
      })
    }
  }, [editFile, context])

  const [file, setFile] = useState({
        patientNumber: '', 
        patientName: '',          
        phoneNumber: '', 
        dateOfBirth: '',        
        gender: '',
  })
  
  
  const { 
    patientNumber, 
    patientName,          
    phoneNumber, 
    dateOfBirth,        
    gender,
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
      updateFile(file)
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
        <input type="text" placeholder="Patient Number" name="patientNumber" value={patientNumber} onChange={onchange} required />       
        <input type="text" placeholder="Patient Name" name="patientName" value={patientName} onChange={onchange} required />   
        <input type="text" placeholder="Phone" name="phoneNumber" value={phoneNumber} onChange={onchange} required />       
        <br />
        <label for="start">Date Of Birth:</label> 
        <input type="date" placeholder="DOB" name="dateOfBirth" value={dateOfBirth} onChange={onchange} required />

        

        <p className="options-label">
          Gender</p>
        <div className="options">
          <label class="container">Male
          <input type="radio" name="gender" value="Male" onChange={onchange} checked={gender === "Male"} />
            <span class="checkmark"></span>
          </label>
          <label class="container">Female
          <input type="radio" name="gender" value="Female" onChange={onchange} checked={gender === "Female"} />
            <span class="checkmark"></span>
          </label>               
        </div>
        <input type="submit" value={editFile !== null ? 'Update File' : 'Add Patient'} className="btn" />
        {editFile !== null ? < input onClick={clearEdit} type="button" className="btn clear" value="Cancel" /> : null}
      </form>

    </div>
  )
}

export default FileForm



