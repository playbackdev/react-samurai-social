import {authMe} from "./AuthReducer";

const SET_INITIALIZED = 'SET_INITIALIZED';



const initialState = {
    initialized: false
};
export type InitialStateType = typeof initialState;

const AppReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            };
        default:
            return state;
    }
};

type InitializedSuccessActionType = {
    type: typeof SET_INITIALIZED //'SET_INITIALIZED'
}

export default AppReducer;


export const setInitialized = (): InitializedSuccessActionType => {
    return { type: SET_INITIALIZED}
};


//thunks
export const initializeApp = () => async (dispatch: any) => {
    await dispatch(authMe());
    dispatch(setInitialized());
};
