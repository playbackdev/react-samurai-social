import {API} from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_IS_FETCHING = 'SET_PROFILE_IS_FETCHING';
const SET_STATUS = 'SET_STATUS';

const initialState = {
    isFetching: false,
    profile: null,
    status: '',
    newPostText: '',
    posts: [
        {id: 0, text: 'My first post', likesCount: 123},
        {id: 1, text: 'My second post', likesCount: 58},
        {id: 2, text: 'My third post', likesCount: 42}
    ]
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: state.posts.length,
                        text: state.newPostText,
                        likesCount: 0
                    }
                ],
                newPostText: ''
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.text
            };
        case SET_PROFILE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        default:
            return state;
    }
};

export default profileReducer;

export const fetchProfileSuccess = profile => {
    return { type: SET_USER_PROFILE, profile}
};

export const addPostActionCreator = () => {
    return {type: ADD_POST};
};

export const updateNewPostTextActionCreator = text => {
    return { type: UPDATE_NEW_POST_TEXT, text: text}
};

export const setIsFetching = isFetching => {
    return { type: SET_PROFILE_IS_FETCHING, isFetching}
};

export const setStatus = status => {
    return { type: SET_STATUS, status}
};



//thunks
export const fetchProfile = (userId) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        API.fetchProfile(userId)
            .then(data => {
                dispatch(fetchProfileSuccess(data));
                dispatch(setIsFetching(false));
            });

    };
};

export const fetchStatus = (userId) => {
    return (dispatch) => {
        API.fetchStatus(userId)
            .then(data => {
                dispatch(setStatus(data));
            });

    };
};

export const updateStatus = (status) => {
    return (dispatch) => {
        API.updateStatus(status)
            .then(data => {
                if(data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            });

    };
};