import {API} from "../api/api";

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
                ...action.data
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

export const fetchAuthUserData = (userId, email, login, isAuth) => {
    return { type: FETCH_USER_DATA, data: {userId, email, login, isAuth}}
};

//thunks
export const authMe = () => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        API.authMe().then(data => {
            if (data.resultCode === 0) {
                dispatch(fetchAuthUserData(
                    data.data.id,
                    data.data.email,
                    data.data.login,
                    true));
            }
            dispatch(setIsFetching(false));
        });
    };
};

