import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
// import { Grid, Card, Fab } from '@material-ui/core';
// import EditIcon from '@material-ui/icons/Edit';
import { useAuth } from '../auth/auth';

// import Pagination from '../filelist/Pagination';
import FilesForm from '../files/FilesForm'



const Home = (props) => {

  const { username } = useAuth();    

  if(!username) {
    return <Redirect to="/login" />;
  }

  return (
    <div className= 'two'>
   <FilesForm />
</div>
  )

}

export default withRouter(Home);