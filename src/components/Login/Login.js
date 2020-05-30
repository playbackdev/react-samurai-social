import React from "react";
import LoginReduxForm from "./LoginForm";
import classes from './Login.module.scss';
import {startSubmit} from 'redux-form';
import {connect} from "react-redux";
import {login, logout} from "../../redux/AuthReducer";
import {Redirect} from "react-router-dom";

const Login = (props) => {

    const onSubmit = (formData, dispatch) => {
        dispatch(startSubmit('login'));
        const captcha = formData.captcha || null;
        props.login(formData.email, formData.password, formData.rememberMe, captcha);
    };

    if(props.isAuth) {
        return <Redirect to={"/profile"}/>;
    }

    return (
        <div className={classes.Login}>
            <h3>Login</h3>
            <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login, logout})(Login);