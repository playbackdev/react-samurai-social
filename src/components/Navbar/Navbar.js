import React from "react";
import classes from './Navbar.module.scss';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faEnvelope, faUser, faUsers} from "@fortawesome/free-solid-svg-icons";
import {faNewspaper} from "@fortawesome/free-solid-svg-icons/faNewspaper";
import {faMusic} from "@fortawesome/free-solid-svg-icons/faMusic";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={classes.nav}>
            <div>

                <NavLink to="/profile" activeClassName={classes.active}>
                    <FontAwesomeIcon icon={faUser} />
                    <span className={classes.navLinkText}>Profile</span>
                </NavLink>
            </div>
            <div>
            <NavLink to="/dialogs" activeClassName={classes.active}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span className={classes.navLinkText}>Messages</span>
            </NavLink>
        </div>
            <div>
                <NavLink to="/users" activeClassName={classes.active}>
                    <FontAwesomeIcon icon={faUsers} />
                    <span className={classes.navLinkText}>Users</span>
                </NavLink>
            </div>
            <div>

                <NavLink to="/news" activeClassName={classes.active}>
                    <FontAwesomeIcon icon={faNewspaper} />
                    <span className={classes.navLinkText}>News</span>
                </NavLink>
            </div>
            <div>
                <NavLink to="/music" activeClassName={classes.active}>
                    <FontAwesomeIcon icon={faMusic} />
                    <span className={classes.navLinkText}>Music</span>
                </NavLink>
            </div>
            <div>
                <NavLink to="/settings" activeClassName={classes.active}>
                    <FontAwesomeIcon icon={faCog} />
                    <span className={classes.navLinkText}>Settings</span>
                </NavLink>
            </div>
        </nav>
    );

};

export default Navbar;