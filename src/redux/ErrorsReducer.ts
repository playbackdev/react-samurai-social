const SET_ERROR = 'errorsReducer/SET_ERROR';
const CLEAR_ERROR = 'errorsReducer/CLEAR_ERROR';

type InitialStateType = {
    error: string | null;
};

const initialState: InitialStateType = {
    error: null
};

const errorsReducer = (state = initialState, action: ErrorsReducerActionsType): InitialStateType => {
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

type ErrorsReducerActionsType = SetUserErrorActionType | ClearUserErrorActionType;

type SetUserErrorActionType = {
    type: typeof SET_ERROR;
    message: string
};
export const setUserError = (message: string): SetUserErrorActionType => {
    return {type: SET_ERROR, message};
};

type ClearUserErrorActionType = {
    type: typeof CLEAR_ERROR;
}
export const clearUserError = (): ClearUserErrorActionType => {
    return {type: CLEAR_ERROR};
};

//thunks
export const setTempUserError = (message: string, timeout: number) => (dispatch: any) => {
    dispatch(setUserError(message));
    setTimeout(() => {
        dispatch(clearUserError());
    }, timeout);


};
