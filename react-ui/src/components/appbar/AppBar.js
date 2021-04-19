import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { MoreVert } from '@material-ui/icons';
import { Menu, MenuItem, AppBar, Toolbar, IconButton, Typography, Button, Grid } from '@material-ui/core';
import { useAuth } from '../auth/auth';

const CustomAppBar = () => {

  const [ shouldOpenMenu, setOpenMenu ] = useState(false);
  const [ menuAnchor, setMenuAnchor ] = useState(null);

  const { setUserName, username, setAuthToken } = useAuth();

  const closeMenu = () => {
    setOpenMenu(false);
  }

  const openMenu = (e) => {
    setOpenMenu(true);
    setMenuAnchor(e.currentTarget);
  }

  const logout = () => {
    setUserName();
    setAuthToken();
    closeMenu();
  }

  return (
    <AppBar position="static">  
        <Toolbar>         
          <Grid justify='space-between' container spacing={24}>
            <Grid item>
              <Typography variant="h6">
                Patient Appointment
              </Typography>

            </Grid>
            {
              username ? <Grid item>
                <Button color="inherit" onClick={()=>logout()} >Logout</Button>
            </Grid> : null
            }
                        
          </Grid>
        </Toolbar>

    </AppBar>
  )
}

export default CustomAppBar;