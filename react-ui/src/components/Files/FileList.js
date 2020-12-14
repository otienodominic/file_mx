import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FileItem from './FileItem'

import AuthContext from '../../context/authContext/authContext'
import FileContext from '../../context/fileContext/FileContext'



const FilesList = () => {

  const context = useContext(FileContext)
  const { loading } = useContext(AuthContext)
  const { files, fileFilter, searchFile, getFiles } = context
  useEffect(() => {
    getFiles();
    // eslint-disable-next-line
  }, []);

  if (files === null || files.length === 0) {
    return <h3 className="no-guest">{loading ? 'Loading files...' : 'Please add a File'}</h3>
  }

  return (
    <div >
      <TransitionGroup className="guests">
        {searchFile !== null ? searchFile.map(file => (
          <CSSTransition key={file._id} timeout={300}
            classNames='item' >
            <FileItem file={file} />
          </CSSTransition>)) :
          files.filter(file => !fileFilter || file.isBooked).map(file => (<CSSTransition key={file._id} timeout={300}
            classNames='item'>
            <FileItem file={file} />
          </CSSTransition>)
          )}
      </TransitionGroup>
    </div>
  )
}
export default FilesList
