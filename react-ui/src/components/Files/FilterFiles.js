import React, { useContext } from 'react'
import FileContext from '../../context/fileContext/FileContext'

const FilterFile = () => {
  const { toggleGuestFilter } = useContext(FileContext)
  return (
    <div className="toggle">
      <label class="switch">
        <input type="checkbox" onChange={() => toggleGuestFilter()} />
        <span class="slider round"></span>
      </label>
      <p className="lead">Show attending only!</p>
    </div>
  )
}
export default FilterFile
