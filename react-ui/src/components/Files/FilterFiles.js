import React, { useContext } from 'react'
import FileContext from '../../context/fileContext/FileContext'

const FilterFile = () => {
  const { toggleFileFilter } = useContext(FileContext)
  return (
    <div className="toggle">
      <label class="switch">
        <input type="checkbox" onChange={() => toggleFileFilter()} />
        <span class="slider round"></span>
      </label>
      <p className="lead">Show attending only!</p>
    </div>
  )
}
export default FilterFile
