import React, { useContext } from 'react'
import FileContext from '../../context/fileContext/FileContext'

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

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Viral Load(Range)</th>
            <th>Booked</th>
            <th>Attending</th>
          </tr>
          <tr>
            <th>Less-400</th>
            <td>{countByViralLoad('Non-Veg').total}</td>
            <td>{countByViralLoad('Non-Veg').booked}</td>
          </tr>
          <tr>
            <th>400-999</th>
            <td>{countByViralLoad('Vegan').total}</td>
            <td>{countByViralLoad('Vegan').booked}</td>
          </tr>
          <tr>
            <th>Over-1000</th>
            <td>{countByViralLoad('Pescatarian').total}</td>
            <td>{countByViralLoad('Pescatarian').booked}</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>{files.length}</td>
            <td>{booked.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CountFile
