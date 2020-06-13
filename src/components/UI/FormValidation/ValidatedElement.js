import React from "react";
import classes from "./ValidatedElement.module.scss"

//остаточные параметры
export const ValidatedElement = ({input, meta, element, ...props}) => {
    const cls = [classes.ValidatedElement];
    if(meta.invalid && meta.error && (meta.touched || meta.submitFailed)) {
        cls.push(classes.error);
    }
    return (
        <div className={cls.join(' ')}>
            {React.createElement(element, {...input, ...props})}

            {/*Если тип checkbox, то создаем для него DOM-элемент Label*/}
            {props.type === 'checkbox' &&
                React.createElement('label', {htmlFor: props.id}, props.label || 'set "label" prop')}
            {/*Создаем span елемент с ошибками*/}
            {meta.touched && !meta.valid && <span className={'error'}>{meta.error}</span>}
        </div>
    )
};