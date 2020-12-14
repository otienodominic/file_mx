import React, { useReducer } from 'react'
import axios from 'axios'
import GuestContext from './FileContext';
import guestReducer from './FileReducer';
import {
    TOGGLE_FILEFILTER,
    SEARCH_FILE,
    CLEAR_SEARCH,
    REMOVE_FILE,
    ADD_FILE,
    EDIT_FILE,
    CLEAR_EDIT,
    UPDATE_FILE,
    GET_FILES,
    FILES_ERROR,
    CLEAR_FILES
} from '../types'

const FileState = (props) => {
  const intialState = {
    fileFilter: false,
    searchFile: null,
    editFile: null,
    files: [],
    error: null,
  }
  const [state, dispatch] = useReducer(guestReducer, intialState)

  // get guests
  const getFiles = async () => {
    try {
      const res = await axios.get('/get_all_files')
      dispatch({
        type: GET_FILES,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: FILES_ERROR,
        payload: err.response.msg
      })
    }
  }

  // Add File

  const addFile = async (file) => {
    const config = {
      'Content-Type': 'application/json'
    }
    try {
      const res = await axios.post('/create-file', file, config)
      dispatch({
        type: ADD_FILE,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: FILES_ERROR,
        payload: err.response.msg
      })
    }
  }


  // remove File
  const removeFile = async (id) => {
    try {
      await axios.delete(`'/delete-file'/${id}`)
      dispatch({
        type: REMOVE_FILE,
        payload: id
      })
    } catch (err) {
      dispatch({
        type: FILES_ERROR,
        payload: err.response.msg
      })
    }
  }

  // update file

  const update_File = async (file) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.put(`/guests/${file._id}`, file, config)
      dispatch({
        type: UPDATE_FILE,
        payload: res.data
      })
      getFiles()

    } catch (err) {
      dispatch({
        type: FILES_ERROR,
        payload: err.response
      })
    }
  }

  //toggle isconfirmed
  const toggleGuestFilter = () => {
    dispatch({
      type: TOGGLE_FILEFILTER
    })
  }

  // Search File
  const search_File = (file) => {
    dispatch({
      type: SEARCH_FILE,
      payload: file
    })
  }
  const clearSearchFile = () => {
    dispatch({
      type: CLEAR_SEARCH
    })
  }

  // Edit File
  const edit_File = (file) => {
    dispatch({
      type: EDIT_FILE,
      payload: file
    })
  }
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT
    })
  }
  const clearFiles = () => {
    dispatch({
      type: CLEAR_FILES
    })
  }
  return (
    <GuestContext.Provider value={{
      files: state.files,
      fileFilter: state.fileFilter,
      searchFile: state.searchFile,
      editFile: state.editFile,
      error: state.error,
      loading: state.loading,
      addFile,
      removeFile,
      edit_File,
      clearEdit,
      update_File,
      toggleGuestFilter,
      search_File,
      clearSearchFile,
      getFiles,
      clearFiles
    }} >
      {props.children}
    </GuestContext.Provider >
  )
}

export default FileState
