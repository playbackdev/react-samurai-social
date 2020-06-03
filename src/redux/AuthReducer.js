import {API} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_IS_FETCHING = 'auth/SET_AUTH_IS_FETCHING';
const FETCH_USER_DATA = 'auth/FETCH_USER_DATA';
const SET_CAPTCHA = 'auth/SET_CAPTCHA';
const CLEAR_CAPTCHA = 'auth/CLEAR_CAPTCHA';

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
export const authMe = () => async (dispatch) => {
    dispatch(setIsFetching(true));
    const response = await API.authMe();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(
            response.data.id,
            response.data.email,
            response.data.login,
            true));
    }
    dispatch(setIsFetching(false));
};

export const login = (email, password, rememberMe, captcha = null) => async dispatch => {
    const data = await API.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(authMe());
        if (captcha) {
            dispatch(clearCaptcha());
        }
    } else if (data.resultCode === 10) {
        const errorText = data.messages.length > 0 ? data.messages.join(', ') : 'Server error';
        dispatch(stopSubmit("login", {_error: errorText}));
        API.getCaptchaUrl()
            .then(data => dispatch(setCaptcha(data.url)));
    } else {
        const errorText = data.messages.length > 0 ? data.messages.join(', ') : 'Server error';
        dispatch(stopSubmit("login", {_error: errorText}));
    }
    //dispatch(stopSubmit('login'));
};

export const logout = () => async (dispatch) => {
    const data = await API.logout()
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(
            null,
            null,
            null,
            false));
    }
};

