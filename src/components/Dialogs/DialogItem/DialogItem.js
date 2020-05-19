import React from "react";
import classes from './DialogItem.module.scss'
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <NavLink to={'/dialogs/' + props.id} className={classes.dialogItem}
                 activeClassName={classes.active}
        >
            {props.name}
        </NavLink>
    );
};

export default DialogItem;