import React from "react";
import classes from './Header.module.scss'

import Logo from '../../assets/img/react_logo.png'
import Navbar from "../Navbar/Navbar";
import {NavLink} from "react-router-dom";
import Preloader from "../UI/Preloader/Preloader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img alt="" src={Logo}
            />
            <Navbar/>
            <div className={classes.LoginPanel}>
                {props.isFetching ? <Preloader/>
                    : props.isAuth ?
                        <div>
                            Hello, {props.login}&nbsp;
                            <button onClick={props.logout}>
                                <FontAwesomeIcon icon={faSignOutAlt}/>
                            </button>
                        </div>
                        : <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>
    );

};

export default Header;