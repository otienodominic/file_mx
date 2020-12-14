import React, { useContext, useState, useEffect } from 'react'
import FileContext from '../../context/fileContext/FileContext'

const FileForm = () => {
  const context = useContext(FileContext)
  const { addFile, editFile, clearEdit, update_File } = context
  
  useEffect(() => {
    if (editFile !== null) {
      setFile(editFile)
    } else {
      setFile({
        patientNumber: '',           
        phoneNumber: '',          
        viralLoad: 'No-Results',
      })
    }
  }, [editFile, context])

  const [file, setFile] = useState({
    patientNumber: '',           
    phoneNumber: '',          
    viralLoad: 'No-Results',
  })
  
  
  const { 
        patientNumber,       
        phoneNumber,  
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
      update_File(file)
      clearEdit()
    }
    setFile({
      patientNumber: '',           
      phoneNumber: '',          
      viralLoad: 'No-Results',
    })
  }
  return (

    <div className="invite-section">
      <h1>{editFile !== null ? 'Edit Patient' : 'Register Patient'}</h1>
      <form onSubmit={onsubmit} >
        <input type="text" placeholder="Patient Number" name="name" value={patientNumber} onChange={onchange} required />       
        <input type="text" placeholder="Phone" name="name" value={phoneNumber} onChange={onchange} required />             
        <p className="options-label">
          Viral Load</p>
        <div className="options">
          <label class="container">Less-400
          <input type="radio" name="diet" value="Non-Veg" onChange={onchange} checked={viralLoad === "Less-400"} />
            <span class="checkmark"></span>
          </label>
          <label class="container">400-999
          <input type="radio" name="diet" value="Vegan" onChange={onchange} checked={viralLoad === "400-999"} />
            <span class="checkmark"></span>
          </label>
          <label class="container">Over-1000
          <input type="radio" name="diet" value="Pescatarian" onChange={onchange} checked={viralLoad === "Over-1000"} />
            <span class="checkmark"></span>
          </label>         
        </div>
        <input type="submit" value={editFile !== null ? 'Update File' : 'Add File'} className="btn" />
        {editFile !== null ? < input onClick={clearEdit} type="button" className="btn clear" value="Cancel" /> : null}
      </form>

    </div>
  )
}

export default FileForm



