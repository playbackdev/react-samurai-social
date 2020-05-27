import React from "react";
import {Field, reduxForm} from "redux-form";
import classes from './Login.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";

const LoginForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.FormItem}>
                <Field
                    component={'input'}
                    name={'login'}
                    type={'text'}
                    placeholder={'Login'}/>
            </div>
            <div className={classes.FormItem}>
                <Field
                    component={'input'}
                    name={'password'}
                    type={'password'}
                    placeholder={'Password'}/>
            </div>
            <div className={classes.FormItem}>
                <Field id={'rememberMe'}
                       className={'customCheckBox'}
                    component={'input'}
                    name={'rememberMe'}
                    type={"checkbox"}
                /><label htmlFor={'rememberMe'}> Remember me</label>
            </div>
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