import React from "react";
import LoginReduxForm from "./LoginForm";
import classes from './Login.module.scss';
import {reset} from 'redux-form';
import {connect} from "react-redux";
import {login, logout} from "../../redux/AuthReducer";
import {Redirect} from "react-router-dom";

const Login = (props) => {

    const onSubmit = (formData, dispatch) => {
        props.login(formData.email, formData.password, formData.rememberMe);
        dispatch(reset('login'));

    };

    if(props.isAuth) {
        return <Redirect to={"/profile"}/>;
    }

    return (
        <div className={classes.Login}>
            <h3>Login</h3>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login, logout})(Login);