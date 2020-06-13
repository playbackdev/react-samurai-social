import React from "react";
import classes from './ProfileInfo.module.scss'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase, faIdCardAlt, faReceipt, faSave, faTimes} from "@fortawesome/free-solid-svg-icons";

import {Field, reduxForm} from "redux-form";
import {ValidatedElement} from "../../UI/FormValidation/ValidatedElement";
import {required} from "../../../utils/validators/validators";

const ProfileInfoForm = (props) => {
    return <React.Fragment>
        <form onSubmit={props.handleSubmit}>
            <h3><FontAwesomeIcon icon={faReceipt} /> Profile Description:</h3>
            {/*FullName Field*/}
            <div className={classes.FormItem}>
                <Field
                    component={ValidatedElement}
                    element={'input'}
                    name={'fullName'}
                    type={'text'}
                    validate={[required]}
                    placeholder={'Enter your full name'}/>
            </div>
            {/*Profile Description Field*/}
            <div className={classes.FormItem}>
                <Field
                    component={ValidatedElement}
                    element={'textarea'}
                    name={'aboutMe'}
                    placeholder={'Profile description'}/>
            </div>
            <h3><FontAwesomeIcon icon={faIdCardAlt} /> Contacts:</h3>
            {Object.keys(props.profile.contacts).map(key => {
                return <div className={classes.FormItem} key={key}>
                    <Field
                        component={ValidatedElement}
                        element={'input'}
                        name={'contacts.'+ key}
                        type={'text'}
                        placeholder={key + ' link'}/>
                </div>
            })}
            <h3><FontAwesomeIcon icon={faBriefcase} /> Job Search:</h3>
            {/*lookingForAJob Field*/}
            <div className={classes.FormItem}>
                <Field id={'lookingForAJob'}
                       className={'customCheckBox'}
                       component={ValidatedElement}
                       element={'input'}
                       label={`I'm looking for a job`}
                       type={"checkbox"}
                       name={'lookingForAJob'}
                />
            </div>
            {/*lookingForAJobDescription Field*/}
            <div className={classes.FormItem}>
                <Field
                    component={ValidatedElement}
                    element={'textarea'}
                    name={'lookingForAJobDescription'}
                    type={'text'}
                    placeholder={'Fill the description'}/>
            </div>
            {/*Ошибки валидации формы*/}
            {props.error && <div className={classes.FormItem + ' ' + classes.error}>
                {props.error}
            </div>}
            {/*Кнопка сабмита формы*/}
            <div className={classes.FormItem + ' ' + classes.buttonsBlock}>
                <button type={"submit"} className={'blue'} disabled={props.submitting}>
                    <FontAwesomeIcon icon={faSave}/>&nbsp;Save
                </button>
                <button type={"button"} className={"red"}
                        disabled={props.submitting}
                        onClick={props.cancelEditMode}>
                    <FontAwesomeIcon icon={faTimes}/>&nbsp;Cancel
                </button>
            </div>
        </form>
    </React.Fragment>
};


export default reduxForm({form: 'profileInfoEdit'})(ProfileInfoForm);