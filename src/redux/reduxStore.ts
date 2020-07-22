import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./ProfileReducer";
import dialogsReducer from "./DialogsReducer";
import usersReducer from "./UsersReducer";
import AuthReducer from "./AuthReducer";
import AppReducer from "./AppReducer";
import errorsReducer from "./ErrorsReducer";

import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: AuthReducer,
    appState: AppReducer,
    form: formReducer,
    userErrors: errorsReducer
});

type RootReducerType = typeof rootReducer; // ~ (state: GLOBALSTATE) => GLOBALSTATE
export type AppStateType = ReturnType<RootReducerType>;




const composeEnhancers =
    typeof window === 'object' &&
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware),
    // other store enhancers if any
);

let store = createStore(rootReducer, enhancer);

export default store;