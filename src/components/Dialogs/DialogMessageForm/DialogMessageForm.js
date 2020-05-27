import React from "react";
import classes from "../Dialogs.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {Field, reduxForm} from "redux-form";

const DialogMessageForm = (props) => {
    return (
        <div className={classes.footer}>
            <form onSubmit={props.handleSubmit}>
                <Field component={'input'}
                        name={'messageText'}
                        type="text"
                        placeholder="Enter your message..."
                />
                <button><FontAwesomeIcon icon={faPaperPlane}/></button>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'sendMessage'
})(DialogMessageForm);