import React from "react";
import classes from "../Dialogs.module.scss";
import DialogItem from "../DialogItem/DialogItem";

const DialogsList = (props) => {
    return (
        <div ref={props.dialogsListEl}  className={classes.dialogsList}>
            {
                props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>)
            }
        </div>
    );
};

export default DialogsList;