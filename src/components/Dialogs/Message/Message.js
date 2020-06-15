import React from "react";
import classes from './Message.module.scss';
import cn from "classnames";

const Message = (props) => {
    return (
        <div className={cn(classes.message, {[classes.own]: props.own})}>
            {props.text}
        </div>
    );
};

export default Message;