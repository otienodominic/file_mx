import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/authContext/authContext'
import FilesList from '../Files/FileList'
import CountFiles from '../Files/CountFiles'
import FileForm from '../Files/FilesForm'
import SearchFile from '../Files/searchFile'
import FilterFile from '../Files/FilterFiles'
import Pagination from './Pagination'
import {useHistory} from 'react-router-dom'
export default function Home() {
    const { loadUser, isAuthencated} = useContext(AuthContext)
    const history = useHistory()
    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
      }, [])
    return (
        <>{ 
            isAuthencated ? (
            <div  className="app-container">
                <div className='one'>                        
                    <FileForm />  
                </div>
                <div className= 'two'>
                    <FilesList />
                </div>
                   
            </div>) : history.push('/login')

            }
        </>
    )
}
