import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AssignmentIcon from '@material-ui/icons/Assignment';

//import Link from '@material-ui/core/Link';

class RouterLink extends Component {

    constructor(props){
        super(props);
    }

    render() {
        
        return (
            <BottomNavigation
                onChange={(event, newValue) => {
                    // console.log(event.currentTarget.textContent);
                    // //console.log(React);   
                    // console.log(this.props);
                }}
                //showLabels
            >
            
            <Link to="/Usuarios">
                <BottomNavigationAction  label="Usuarios" icon={<AccountCircleIcon/>}/>
            </Link>
            {/* /////// */}
            <Link to="/Login">
                <BottomNavigationAction  label="Login" icon={<AccountCircleIcon/>}/>
            </Link>
            {/* /////// */}
            <Link to="/Cursos">
                <BottomNavigationAction  label="Cursos" icon={<LibraryBooksIcon />} />
            </Link>
            <Link to="/Evaluaciones"> 
                <BottomNavigationAction  label="Evaluaciones" icon={<AssignmentIcon />} />
            </Link>   
            </BottomNavigation>
        );
    }
}

export default RouterLink;