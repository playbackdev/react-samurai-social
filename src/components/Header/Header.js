import React from "react";
import classes from './Header.module.scss'

import Logo from '../../resources/images/react_logo.png'
import Navbar from "../Navbar/Navbar";

const Header = () => {
    return (
        <header className={classes.header}>
            <img alt="" src={Logo}
            />
            <Navbar/>
            <div>
                Login panel
            </div>
        </header>
    );

};

export default Header;