import {API} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_IS_FETCHING = 'SET_PROFILE_IS_FETCHING';
const SET_STATUS = 'SET_STATUS';
const SET_AVATAR_SUCCESS = 'SET_AVATAR_SUCCESS';

const initialState = {
    isProfileFetching: false,
    profile: null,
    status: '',
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
                        text: action.newPostText,
                        likesCount: 0
                    }
                ]
            };
        case DELETE_POST:
            return {
                ...state, posts: state.posts.filter(p => p.id !== action.postId)
            };
        case SET_PROFILE_IS_FETCHING:
            return {
                ...state, isProfileFetching: action.isProfileFetching
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case SET_AVATAR_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos
                }
            };
        default:
            return state;
    }
};

export default profileReducer;

export const fetchProfileSuccess = profile => {
    return { type: SET_USER_PROFILE, profile}
};

export const addPost = (newPostText) => {
    return {type: ADD_POST, newPostText};
};

export const deletePost = (postId) => {
    return {type: DELETE_POST, postId};
};

export const setIsProfileFetching = isProfileFetching => {
    return { type: SET_PROFILE_IS_FETCHING, isProfileFetching}
};

export const setStatus = status => {
    return { type: SET_STATUS, status}
};

export const saveAvatarSuccess = photos => {
    return { type: SET_AVATAR_SUCCESS, photos}
};



//thunks
export const fetchProfile = (userId) => async (dispatch) => {
    dispatch(setIsProfileFetching(true));
    const data = await API.fetchProfile(userId);
    dispatch(fetchProfileSuccess(data));
    dispatch(setIsProfileFetching(false));

};

export const fetchStatus = (userId) => async (dispatch) => {
    const data = await API.fetchStatus(userId);
    dispatch(setStatus(data));
};

export const updateStatus = (status) => async dispatch => {
    const data = await API.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const saveAvatar = (avatar) => async dispatch => {
    const data = await API.saveAvatar(avatar);
    if (data.resultCode === 0) {
        dispatch(saveAvatarSuccess(data.data.photos));
    }
};

export const saveProfileInfo = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await API.saveProfileInfo(profile);
    if (data.resultCode === 0) {
        dispatch(fetchProfile(userId));
    } else {
        const errorFormText = data.messages.length > 0 ? data.messages.join(', ') : 'Server error';

        let fieldErrors = {};
        for(let i = 0; i < data.messages.length; i++) {
            if(data.messages[i].includes('Facebook')) {
                fieldErrors["contacts"] = {...fieldErrors["contacts"], "facebook": "Invalid link format"};
            }
            if(data.messages[i].includes('Website')) {
                fieldErrors["contacts"] = {...fieldErrors["contacts"], "website": "Invalid link format"};
            }
            if(data.messages[i].includes('Instagram')) {
                fieldErrors["contacts"] = {...fieldErrors["contacts"], "instagram": "Invalid link format"};
            }
            if(data.messages[i].includes('Vk')) {
                fieldErrors["contacts"] = {...fieldErrors["contacts"], "vk": "Invalid link format"};
            }
            if(data.messages[i].includes('Youtube')) {
                fieldErrors["contacts"] = {...fieldErrors["contacts"], "youtbe": "Invalid link format"};
            }
            if(data.messages[i].includes('Github')) {
                fieldErrors["contacts"] = {...fieldErrors["contacts"], "github": "Invalid link format"};
            }
            if(data.messages[i].includes('MainLink')) {
                fieldErrors["contacts"] = {...fieldErrors["contacts"], "mainLink": "Invalid link format"};
            }
            if(data.messages[i].includes('Twitter')) {
                fieldErrors["contacts"] = {...fieldErrors["contacts"], "twitter": "Invalid link format"};
            }
        }

        dispatch(stopSubmit("profileInfoEdit", {_error: errorFormText, ...fieldErrors}));

        return Promise.reject(errorFormText);
    }
};

