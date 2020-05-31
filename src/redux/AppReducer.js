import {API} from "../api/api";
import {authMe} from "./AuthReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

const initialState = {
    initialized: false
};

const AppReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
};

export default AppReducer;


export const setInitialized = () => {
    return { type: SET_INITIALIZED}
};


//thunks
export const initializeApp = () => async (dispatch) => {
    await dispatch(authMe());
    dispatch(setInitialized());
};
