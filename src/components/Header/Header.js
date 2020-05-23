import React from "react";
import classes from './Header.module.scss'

import Logo from '../../assets/img/react_logo.png'
import Navbar from "../Navbar/Navbar";
import {NavLink} from "react-router-dom";
import Preloader from "../UI/Preloader/Preloader";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img alt="" src={Logo}
            />
            <Navbar/>
            <div className={classes.LoginPanel}>
                {props.isFetching ? <Preloader/>
                    : props.isAuth ? 'You logged as: ' + props.login
                        : <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>
    );

};

export default Header;