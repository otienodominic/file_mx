
import React, { useEffect, useMemo, useContext, useState } from 'react'
import AuthContext from '../../context/authContext/authContext'
import FileContext from '../../context/fileContext/FileContext'
import Button from "@material-ui/core/Button";
import {useHistory} from 'react-router-dom'
import moment from 'moment'

export default function UpdateFile(props) {  
console.log(props)

const history = useHistory()

const { updateFile } = useContext(FileContext)
const [file, setFile] = useState({
  _id: props.match.params.id,
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
  setFile({
    viralLoad: '',
  appointmentDate: '',
  isBooked: ''
  
  })
}
  return (
    <div className="modal" id="modal">
       <div className="modal-table-container">
        <div className="modal-table-cell">
          <div className="modal-overlay small">
                <div className="modal-header">
                  <h1 className="modal-title">
                    ISSUE APPOINTMENT
                  </h1>
                </div>       
                
        <form onSubmit={onsubmit} >          
            <input type="text" placeholder="Viral Load Results" name="viralLoad" value={file.viralLoad} onChange={onchange} />       
                <br />
                <label for="start">Appointment Date:</label> 
                <input type="date" placeholder="DOB" name="appointmentDate" value={ moment(file.appointmentDate).format("LL")} onChange={onchange} required />        

                <p className="options-label"> Patient Is Booked? </p>
                <div className="options">
                <label class="container">Yes
                <input type="radio" name="isBooked" value={file.isBooked === true} onChange={onchange}  />
                  <span class="checkmark"></span>
                </label>
                <label class="container">No
                <input type="radio" name="isBooked" value={file.isBooked === false} onChange={onchange}  />
                  <span class="checkmark"></span>
                </label>               
                    </div>
                <input type="submit" value={'Update File'} className="btn" />  
                <Button onClick={() => history.goBack()}> Cancel </Button>                  
                        
          </form>                
        
          </div>
       </div>
      </div>
    </div>
  )
}
