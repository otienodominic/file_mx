import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
    Container,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
  } from 'reactstrap';
  import TableContainer from './TableContainer';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { SelectColumnFilter } from './Filters';
import AuthContext from '../../context/authContext/authContext'
import FileContext from '../../context/fileContext/FileContext'


export default function FilesRender() {
const context = useContext(FileContext)
  const { loading } = useContext(AuthContext)
  const { files, fileFilter, searchFile, getFiles } = context
  const { removeFile, edit_File, clearEdit, updateFile } = useContext(FileContext)
  const {
      _id,
    patientNumber,  
    patientName,  
    phoneNumber,  
    dateOfBirth,  
    gender, 
    visitDate, 
    appointmentDate, 
    viralLoad, 
    // checkedOutBy,
    isBooked
} = file

  const handleRemove = () => {
    removeFile(_id)
    clearEdit()
  }
  useEffect(() => {
    getFiles();
    
  }, []);

  if (files === null || files.length === 0) {
    return <h3 className="no-guest">{loading ? 'Loading files...' : 'Please add a File'}</h3>
  }
    return (
        <div>
            
        </div>
    )
}
