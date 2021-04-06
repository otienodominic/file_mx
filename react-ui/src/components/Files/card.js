import React from 'react'

export default function card() {
    return (
        <div class="card-container">
         <div class="upper-container">
            <div class="image-container">
               <img src="profile.jpg" />
            </div>
         </div>
         <div class="lower-container">
            <div>
            <strong>Patient Name: </strong> {patientName} <br />
            <strong>Phone:</strong>{phoneNumber} <br />
            <strong>Age: </strong>  {(moment().diff(dateOfBirth, 'years', true)).toFixed(1)} <br />
            <strong>Gender:</strong>{gender} <br />
            <strong>Appointment Date:</strong>{moment(Date.parse(appointmentDate)).format("MMM Do YYYY")} <br />
            <strong>Viral Load Result:</strong>{viralLoad} <br />
            <strong>Patient Booked? :</strong>{isBooked ? 'Yes': 'No'} <br />
            </div>            
            <div>
               <button onClick={handleRemove}  class="btn" id='del'>Delete</button>
               <button onClick={weka} class="btn">Issue Return Date</button>
            </div>
         </div>
      </div>
    )
}
