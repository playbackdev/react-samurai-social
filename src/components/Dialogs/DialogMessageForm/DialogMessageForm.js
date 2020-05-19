import React from "react";
import classes from "../Dialogs.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";

const DialogMessageForm = (props) => {
    return (
        <div className={classes.footer}>
            <form onSubmit={props.sendMessageHandler}>
                <input type="text" value={props.messageText}
                       onChange={props.onInputMessageChangeHandler}
                       placeholder="Enter your message..."
                />
                <button><FontAwesomeIcon icon={faPaperPlane}/></button>
            </form>
        </div>
    );
};

export default DialogMessageForm;