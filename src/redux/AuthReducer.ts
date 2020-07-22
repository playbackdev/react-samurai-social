import {API} from "../api/api";
import {stopSubmit} from "redux-form";
import {setTempUserError} from "./ErrorsReducer";

const SET_AUTH_IS_FETCHING = 'auth/SET_AUTH_IS_FETCHING';
const FETCH_USER_DATA = 'auth/FETCH_USER_DATA';
const SET_CAPTCHA = 'auth/SET_CAPTCHA';
const CLEAR_CAPTCHA = 'auth/CLEAR_CAPTCHA';


const initialState: InitialStateType = {
    isFetching: false,
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const AuthReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch(action.type) {
        case FETCH_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case SET_AUTH_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload.isFetching,
            };
        case SET_CAPTCHA:
            return {
                ...state,
                captchaUrl: action.payload.captchaUrl
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


export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => {
    return { type: SET_AUTH_IS_FETCHING, payload: {isFetching} }
};


export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return { type: FETCH_USER_DATA, payload: {userId, email, login, isAuth}}
};


export const setCaptcha = (captchaUrl: string): SetCaptchaActionType => {
    return { type: SET_CAPTCHA, payload: {captchaUrl} }
};

export const clearCaptcha = (): ClearCaptchaActionType => {
    return { type: CLEAR_CAPTCHA };
};

//thunks
export const authMe = () => async (dispatch: any) => {
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

export const login = (email: string, password: string, rememberMe: boolean, captcha = null) => async (dispatch: any) => {
    const data = await API.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(authMe());
        if (captcha) {
            dispatch(clearCaptcha());
        }
    } else {
        if (data.resultCode === 10) {
            dispatch(getCaptchaUrl());
            dispatch(setTempUserError("Вы слишком много раз ввели неверный пароль", 5000));
        }
        const errorText = data.messages.length > 0 ? data.messages.join(', ') : 'Server error';
        dispatch(stopSubmit("login", {_error: errorText}));
    }
    //dispatch(stopSubmit('login'));
};

export const getCaptchaUrl = () => (dispatch: any) => {
    API.getCaptchaUrl()
        .then((data: any) => dispatch(setCaptcha(data.url)));
};

export const logout = () => async (dispatch: any) => {
    const data = await API.logout();
    if (data.resultCode === 0) {
        dispatch(setAuthUserData(
            null,
            null,
            null,
            false));
    }
};

// ============ TYPES ==============//
export type InitialStateType = {
    isFetching: boolean;
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    captchaUrl: string | null;
};

type ActionTypes = SetIsFetchingActionType | SetAuthUserDataActionType | SetCaptchaActionType | ClearCaptchaActionType;

type SetIsFetchingActionType = {
    type: typeof SET_AUTH_IS_FETCHING;
    payload: {isFetching: boolean};
};

type SetAuthUserDataActionType = {
    type: typeof FETCH_USER_DATA;
    payload: SetAuthUserDataPayloadType;
};

type SetAuthUserDataPayloadType = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
};

type SetCaptchaActionType = {
    type: typeof SET_CAPTCHA;
    payload: {captchaUrl: string};
};

type ClearCaptchaActionType = {
    type: typeof CLEAR_CAPTCHA;
}
