import React, { useContext, useState, useEffect } from 'react'
import FileContext from '../../context/fileContext/FileContext'

const FileForm = () => {  
  const context = useContext(FileContext)
  const { addFile, editFile, clearEdit, updateFile, error, clearErrors} = context  
  
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
        viralLoad:'',
      })
    }
  }, [editFile, context])

  const [file, setFile] = useState({
        patientNumber: '', 
        patientName: '',          
        phoneNumber: '', 
        dateOfBirth: '',        
        gender: '',
        viralLoad: '',
  })
  
  
  const { 
    patientNumber, 
    patientName,          
    phoneNumber, 
    dateOfBirth,        
    gender,
    viralLoad,
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
        viralLoad: '',
    })
  }
  return (

    <div className="invite-section">
      <h1>{editFile !== null ? 'Edit Patient' : 'Register Patient'}</h1>
      <form onSubmit={onsubmit} >
        <input type="text" placeholder="Patient Number" name="patientNumber" value={patientNumber} onChange={onchange} required />       
        <input type="text" placeholder="Patient Name" name="patientName" value={patientName} onChange={onchange} required />   
        <input type="text" placeholder="Phone" name="phoneNumber" value={phoneNumber} onChange={onchange} required />  
        <input type="text" placeholder='Batch Number' name="viralLoad"  value={viralLoad} onChange={onchange} />
                       
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
        {error !== null && <button className="danger" type="button"  >{error} <span onClick={() => clearErrors()}>X</span></button>}
      </form>

    </div>
  )
}

export default FileForm



