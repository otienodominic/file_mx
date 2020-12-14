import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/authContext/authContext'
import FilesList from '../Files/FileList'
import CountFiles from '../Files/CountFiles'
import FileForm from '../Files/FilesForm'
import SearchFile from '../Files/searchFile'
import FilterFile from '../Files/FilterFiles'

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
                    <FilterFile />
                    <SearchFile/>
               </div>
               <FileForm />
               <CountFiles />
           </div>
            <FilesList />
        </div>
    )
}
