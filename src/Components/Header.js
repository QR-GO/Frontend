import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom'
import logo from '../Images/logo.png'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles( (theme) => ({
    logo: {
        backgroundImage: `url(${logo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '50px',
        height: '50px',
        marginLeft: '10px',
    },
    customAppBar: {
        backgroundColor: '#ffffff',
    },
    ToolbarItem: {
        borderRadius: '8px',
	    marginLeft: '50px',
	    color: '#693fd3',
        fontWeight: 'bold',
        textDecoration: 'none',
    },
    logout: {
        color: '#693fd3',
        borderRadius: '8px',
        border: `1px solid #693fd3`,
        background: '#ffffff',
        fontWeight: 'bold',
        position: 'absolute',
        right: '20px'
    }
  }));

const Header = (props) => {
    const classes = useStyles();

    const isAuth = props.changeHeader;

    const logoutButtonClick = () => {
        window.location.assign('https://qr-go.herokuapp.com/auth/logout');
    }

    const renderBaseHeader= () => {
        return (
            <AppBar className={classes.customAppBar}>
                <Toolbar>
                    <div className={classes.logo}></div>
                    <NavLink className={classes.ToolbarItem} exact to="/games">Games</NavLink>
                    <NavLink className={classes.ToolbarItem} exact to="/routes">Routes</NavLink>
                    <NavLink className={classes.ToolbarItem} exact to="/statistics">Statistics</NavLink>
                    <Button className={classes.logout} variant="contained" onClick={logoutButtonClick} >LOGOUT</Button>
                </Toolbar>
            </AppBar>
        ); 
    }    
    const renderHomePageHeader= () => {
        return (
            <AppBar className={classes.customAppBar}>
                <Toolbar>
                    <div className={classes.logo}></div>
                    <NavLink className={classes.ToolbarItem} exact to="/">Get Started</NavLink>
                    <NavLink className={classes.ToolbarItem} exact to="/">How It Works</NavLink>
                    <NavLink className={classes.ToolbarItem} exact to="/">About Us</NavLink>
                    <NavLink className={classes.ToolbarItem} exact to="/">Contact</NavLink>
                </Toolbar>
            </AppBar>
        ); 
    }
    return isAuth ? renderBaseHeader() : renderHomePageHeader();
}
export default Header;