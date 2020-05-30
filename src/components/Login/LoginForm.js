import React from "react";
import {Field, reduxForm} from "redux-form";
import classes from './Login.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {ValidatedElement} from "../UI/FormValidation/ValidatedElement";
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
            {/*Каптча*/}
            {props.captchaUrl && <div className={classes.FormItem}>
                <div>
                    <img alt="" src={props.captchaUrl}/>
                </div>
                <Field
                    component={ValidatedElement}
                    element={'input'}
                    name={'captcha'}
                    type={'text'}
                    validate={[required]}
                    placeholder={'Enter captcha'}/>
            </div>}
            {/*Ошибки валидации формы*/}
            {props.error && <div className={classes.FormItem + ' ' + classes.error}>
                {props.error}
            </div>}
            {/*Кнопка сабмита формы*/}
            <div className={classes.FormItem}>
                <button disabled={props.submitting}
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