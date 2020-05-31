import {API} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_IS_FETCHING = 'SET_AUTH_IS_FETCHING';
const FETCH_USER_DATA = 'FETCH_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';
const CLEAR_CAPTCHA = 'CLEAR_CAPTCHA';

const initialState = {
    isFetching: false,
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case SET_AUTH_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };
        case SET_CAPTCHA:
            return {
                ...state, captchaUrl: action.captchaUrl
            };
        case CLEAR_CAPTCHA:
            return {
                ...state, captchaUrl: null
            };
        default:
            return state;
    }
};

export default AuthReducer;


export const setIsFetching = isFetching => {
    return { type: SET_AUTH_IS_FETCHING, isFetching}
};

export const setAuthUserData = (userId, email, login, isAuth) => {
    return { type: FETCH_USER_DATA, payload: {userId, email, login, isAuth}}
};

export const setCaptcha = (captchaUrl) => {
    return { type: SET_CAPTCHA, captchaUrl}
};

export const clearCaptcha = () => {
    return { type: CLEAR_CAPTCHA };
};

//thunks
export const authMe = () => dispatch => {
    dispatch(setIsFetching(true));
    return API.authMe().then(data => {
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(
                data.data.id,
                data.data.email,
                data.data.login,
                true));
        }
        dispatch(setIsFetching(false));
    });
};

export const login = (email, password, rememberMe, captcha = null) => dispatch => {
    API.login(email, password, rememberMe, captcha)
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(authMe());
                if(captcha) { dispatch(clearCaptcha()); }
            } else if(data.resultCode === 10) {
                API.getCaptchaUrl()
                    .then(data => dispatch(setCaptcha(data.url)));
            } else {
                const errorText = data.messages.length > 0 ? data.messages.join(', ') : 'Server error';
                dispatch(stopSubmit("login", {_error: errorText}));
            }
            dispatch(stopSubmit('login'));
        })
};

export const logout = () => dispatch => {
    API.logout()
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(setAuthUserData(
                    null,
                    null,
                    null,
                    false));
            }
        })
};

