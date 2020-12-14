import React, { useRef, useContext } from 'react'
import FileContext from '../../context/fileContext/FileContext'

const SearchFile = () => {
  const { search_File, clearSearchFile } = useContext(FileContext)
  const file = useRef('')
  const onchange = e => {
    if (file.current.value !== '') {
      search_File(e.target.value)
    } else {
      clearSearchFile()
    }
  }
  return (
    <div>
      <input ref={file} onChange={onchange} type="text" placeholder="Search Patient by name..." className="search" />
      <i className="fas fa-search search-icon" />
    </div>
  )
}
export default SearchFile
