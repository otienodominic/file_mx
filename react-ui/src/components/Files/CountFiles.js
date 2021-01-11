import React, { useContext } from 'react'
import FileContext from '../../context/fileContext/FileContext'
import moment from 'moment'

const CountFile = () => {
  const { files } = useContext(FileContext)  
  

  // total appointed
  const booked = files.filter(file => file.isBooked);
  // count by appointment
  const countByViralLoad = (viralLoad) => {
    return {
      total: files.filter(file => file.viralLoad === viralLoad).length,
      booked: booked.filter(file => file.viralLoad === viralLoad).length
    };
  }
 
  const countByVisitDate = (appointmentDate) => {
    return {
      total: files.filter(file => file.appointmentDate === Date.parse(appointmentDate)).length
     
    };
  }

const returnTwoWeeks = () => {
  return moment(moment().add(2, 'w').calendar()).format("MMM Do YYYY")}

console.log(returnTwoWeeks())
const returnOneMonth = () => {  
  return moment(moment().add(4, 'w').calendar()).format("MMM Do YYYY")
  }
const returnTwoMonths = () => {  
  return moment(moment().add(8, 'w').calendar()).format("MMM Do YYYY")
  }
const returnThreeMonths = () => {  
  return moment(moment().add(12, 'w').calendar()).format("MMM Do YYYY")
  }  
const returnFourMonths = () => {  
  return moment(moment().add(16, 'w').calendar()).format("MMM Do YYYY")
  }
const returnFiveMonths = () => {  
  return moment(moment().add(20, 'w').calendar()).format("MMM Do YYYY")
  } 
const returnSixMonths = () => {  
  return moment(moment().add(24, 'w').calendar()).format("MMM Do YYYY")
  }

// Clients booking list counter

const two_weeks_booking = () => {
  return files.filter(file=>  moment(Date.parse(file.appointmentDate)).format("MMM Do YYYY") === moment(moment().add(2, 'w').calendar()).format("MMM Do YYYY")).length
}

const one_month_booking = () => {
  return files.filter(file=>  moment(Date.parse(file.appointmentDate)).format("MMM Do YYYY") === moment(moment().add(4, 'w').calendar()).format("MMM Do YYYY")).length
}

const two_months_booking = () => {
  return files.filter(file=>  moment(Date.parse(file.appointmentDate)).format("MMM Do YYYY") === moment(moment().add(8, 'w').calendar()).format("MMM Do YYYY")).length
}
const three_months_booking = () => {
  return files.filter(file=>  moment(Date.parse(file.appointmentDate)).format("MMM Do YYYY") === moment(moment().add(12, 'w').calendar()).format("MMM Do YYYY")).length
}
const four_months_booking = () => {
  return files.filter(file=>  moment(Date.parse(file.appointmentDate)).format("MMM Do YYYY") === moment(moment().add(16, 'w').calendar()).format("MMM Do YYYY")).length
}
const five_months_booking = () => {
  return files.filter(file=>  moment(Date.parse(file.appointmentDate)).format("MMM Do YYYY") === moment(moment().add(20, 'w').calendar()).format("MMM Do YYYY")).length
}
const six_months_booking = () => {
  return files.filter(file=>  moment(Date.parse(file.appointmentDate)).format("MMM Do YYYY") === moment(moment().add(24, 'w').calendar()).format("MMM Do YYYY")).length
}
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Appointment Schedule</th>
            <th>Booked</th>
            <th>Date of Appointment</th>
          </tr>
          <tr>
            <th>Two Weeks</th>            
            <td>{two_weeks_booking()}</td>
            <td>{returnTwoWeeks()}</td>            
          </tr>
          <tr>
            <th>One Month</th>
            <td>{one_month_booking(returnOneMonth())}</td>
            <td>{returnOneMonth()}</td>
          </tr>
          <tr>
            <th>Two Months</th>
            <td>{two_months_booking(returnTwoMonths())}</td>
            <td>{returnTwoMonths()}</td>
          </tr>
          <tr>
            <th>Three Months</th>
            <td>{three_months_booking(returnThreeMonths())}</td>
            <td>{returnThreeMonths()}</td>
          </tr>
          <tr>
            <th>Four Months</th>
            <td>{four_months_booking(returnFourMonths())}</td>
            <td>{returnFourMonths()}</td>
          </tr>
          <tr>
            <th>Five Months</th>
            <td>{five_months_booking(returnFiveMonths())}</td>
            <td>{returnFiveMonths()}</td>
          </tr>
          <tr>
            <th>Six Months</th>
            <td>{six_months_booking(returnSixMonths())}</td>
            <td>{returnSixMonths()}</td>
          </tr>
          <tr>
          <th><strong>Total Booked</strong></th>
            <td><strong>{files.length}</strong></td>            
          </tr>
          <tr>
          <th><strong>Total Clients</strong></th>
            <td><strong>{files.length}</strong></td>            
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CountFile
