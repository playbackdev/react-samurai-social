import {API} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_IS_FETCHING = 'SET_AUTH_IS_FETCHING';
const FETCH_USER_DATA = 'FETCH_USER_DATA';

const initialState = {
    isFetching: false,
    userId: null,
    email: null,
    login: null,
    isAuth: false
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

//thunks
export const authMe = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        API.authMe().then(data => {
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
};

export const login = (email, password, rememberMe) => dispatch => {
    API.login(email, password, rememberMe)
        .then(data => {
            if(data.resultCode === 0) {
                dispatch(authMe())
            } else {
                const errorText = data.messages.length > 0 ? data.messages.join(', ') : 'Server error';
                dispatch(stopSubmit("login", {_error: errorText}));
            }
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

