import React from "react";
import classes from "./FormValidation.module.scss"

//остаточные параметры
export const ValidatedElement = ({input, meta, element, ...props}) => {
    const cls = [classes.ValidationElement];
    if(meta.invalid && meta.error && (meta.touched || meta.submitFailed)) {
        cls.push(classes.error);
    }

    return (
        <div className={cls.join(' ')}>
            {React.createElement(element, {...input, ...props})}
            {props.type === 'checkbox' &&
                React.createElement('label', {htmlFor: props.id}, props.label || 'set "label" prop')}
            {meta.touched && !meta.valid && <span className={'error'}>{meta.error}</span>}
        </div>
    )
};