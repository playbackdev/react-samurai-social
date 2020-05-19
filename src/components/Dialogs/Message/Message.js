import React from "react";
import classes from './Message.module.scss'

const Message = (props) => {
    const cls = [classes.message];
    if(props.own) {
        cls.push(classes.own);
    }
    return (
        <div className={cls.join(' ')}>
            {props.text}
        </div>
    );
};

export default Message;