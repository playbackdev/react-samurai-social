import React from "react";
import classes from './Button.module.scss';

const Button = (props) => {

    const cls = [classes.Button];
    if(props.color) {
        if(props.color === 'blue') {
            cls.push(classes.blue);
        } else if(props.color === 'red') {
            cls.push(classes.red);
        }
    }

    return (
        <button
            className={cls.join(' ')}
            onClick={props.onClick}
            disabled={!!props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;