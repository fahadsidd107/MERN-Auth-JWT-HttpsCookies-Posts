import { useState, useEffect } from "react"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
  } from "react-router-dom";
import axios from 'axios';
import { baseUrl } from "../../core"
import { GlobalContext } from '../../context/Context';
import { useContext } from "react";

function Home() {
    let history = useHistory();
    let { state, dispatch } = useContext(GlobalContext);

    const [profile, setProfile] = useState({})

    useEffect(() => {

        axios.get(`${baseUrl}/api/v1/profile`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data);
                setProfile(res.data)
            })
    }, [])


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome {state.user.name}
        </Typography>
        <Button onClick={() => {history.push("/");}} variant="contained" color="error">Posts</Button>
        <Button  onClick={() => {
                   
                      history.push("/");
                      dispatch({
                        type: "USER_LOGOUT",
                        payload: null,
                      });
              
                  }} variant="contained" color="error">Logout</Button>

      </Toolbar>
    </AppBar>
  </Box>

  <h1 style={{ margin: "auto", padding: "1rem", textAlign: "center" }}>Profile Info</h1>
      <br />
      <Typography gutterBottom  >
            Name: {state.user.name}<br />Email: {state.user.email}<br />Contact: {state.user.contact}<br />website: {state.user.website}<br />Address: {state.user.address}
          </Typography>
      <br /><br />

        </>
    );
}

export default Home;