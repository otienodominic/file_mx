import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/authContext/authContext'
import FileForm from '../Files/FilesForm'
import FileList from '../Files/FileItem'

export default function Home() {
    const { loadUser} = useContext(AuthContext)
    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
      }, [])
    return (
        <div  className="app-container">
           <div className="main">
               <div className="filter">

               </div>
               <FileForm />
           </div>
        </div>
    )
}
