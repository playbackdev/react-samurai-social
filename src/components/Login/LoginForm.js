import React from "react";
import {Field, reduxForm} from "redux-form";
import classes from './Login.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {ValidatedElement} from "../UI/FormValidation/FormValidation";
import {maxLength, minLength, required} from "../../utils/validators/validators";

const loginValidators = [required, maxLength(16)];
const passwordValidators = [required, minLength(6)];

const LoginForm = (props) => {


    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.FormItem}>
                <Field
                    component={ValidatedElement}
                    element={'input'}
                    name={'login'}
                    type={'text'}
                    validate={loginValidators}
                    placeholder={'Login'}/>
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
                       validate={[required]}
                />
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