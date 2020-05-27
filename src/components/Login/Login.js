import React from "react";
import LoginReduxForm from "./LoginForm";
import classes from './Login.module.scss';
import {reset} from 'redux-form';

const Login = (props) => {

    const onSubmit = (formData, dispatch) => {
        console.log(JSON.stringify(formData));
        dispatch(reset('login'));

    };

    return (
        <div className={classes.Login}>
            <h3>Login</h3>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};


export default Login;