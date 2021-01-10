import React, { useContext, useState } from 'react'
import AuthContext from '../../context/authContext/authContext'
import FileContext from '../../context/fileContext/FileContext'
import {useHistory} from 'react-router-dom'
export default function RecordUpdate(props) {
    const {isAuthencated, user} = useContext(AuthContext)

    const history = useHistory()

const { updateFile } = useContext(FileContext)
const [file, setFile] = useState({
  _id: props.match.params.id,
  patientName: history.location.patientName,
  viralLoad: history.location.viralLoad,
  appointmentDate: history.location.appointmentDate, 
  isBooked: history.location.isBooked
})


const onchange = (e) => {
  setFile({
    ...file,
    [e.target.name]: e.target.value
  })
}

const onsubmit =(e)=>{
  e.preventDefault()
  updateFile(file)
  console.log(file.isBooked)
  setFile({
    viralLoad: '',
  appointmentDate: '',
  isBooked: ''
  
  })
}

    return (
        <>
        {
        isAuthencated ? (
            <form className='update-patient-form' onSubmit={onsubmit}>
                <p ><strong>ISSUE APPOINTMENT </strong></p>
                <label>
                    Patient Name: {file.patientName}
                </label>
                <label className='input-labels'>                
                    Appointment Date:
                    <input type="date" className='input' name="appointmentDate" value={ file.appointmentDate} onChange={onchange} required />
                </label>             
                
                <label className='input-labels'>  
                    Latest Viral Load Result:     
                    <input type="text" className='input' name="viralLoad" placeholder='Latest Viral Load' value={file.viralLoad} onChange={onchange} />
                </label> 
                
                
                <input type="submit" value="Submit"  className='btn'/>
                <button onClick={() => history.push('/')} className='cancel-button'>Cancel</button>
            </form>
            ): history.push('/')
        }
        </>
    )
}
