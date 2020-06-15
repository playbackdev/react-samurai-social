const SET_ERROR = 'errorsReducer/SET_ERROR';
const CLEAR_ERROR = 'errorsReducer/CLEAR_ERROR';

const initialState = {
    error: null
};

const errorsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ERROR:
            return {
                ...state,
                error: action.message
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export default errorsReducer;

export const setUserError = (message) => {
    return {type: SET_ERROR, message};
};

export const clearUserError = () => {
    return {type: CLEAR_ERROR};
};

//thunks
export const setTempUserError = (message, timeout) => dispatch => {
    dispatch(setUserError(message));
    setTimeout(() => {
        dispatch(clearUserError());
    }, timeout);


};
