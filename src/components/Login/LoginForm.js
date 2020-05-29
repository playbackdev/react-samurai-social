import React from "react";
import {Field, reduxForm} from "redux-form";
import classes from './Login.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {ValidatedElement} from "../UI/FormValidation/FormValidation";
import {maxLength, minLength, required} from "../../utils/validators/validators";

const loginValidators = [required, maxLength(32)];
const passwordValidators = [required, minLength(6)];

const LoginForm = (props) => {


    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.FormItem}>
                <Field
                    component={ValidatedElement}
                    element={'input'}
                    name={'email'}
                    type={'text'}
                    validate={loginValidators}
                    placeholder={'Email'}/>
            </div>
            <div className={classes.FormItem}>
                <Field
                    component={ValidatedElement}
                    element={'input'}
                    name={'password'}
                    type={'password'}
                    validate={passwordValidators}
                    placeholder={'Password'}/>
            </div>
            <div className={classes.FormItem}>
                <Field id={'rememberMe'}
                       className={'customCheckBox'}
                       component={ValidatedElement}
                       element={'input'}
                       label={'Remember me'}
                       type={"checkbox"}
                       name={'rememberMe'}
                />
            </div>
            {props.error && <div className={classes.FormItem}>
                {props.error}
            </div>}
            <div className={classes.FormItem}>
                <button
                    className={'blue'}
                >
                    <FontAwesomeIcon icon={faSignInAlt}/>&nbsp;
                    Login
                </button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm(
    {
        form: 'login',
    })(LoginForm);

export default LoginReduxForm;