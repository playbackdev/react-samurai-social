import {API} from "../api/api";
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_IS_FETCHING = 'SET_PROFILE_IS_FETCHING';
const SET_STATUS = 'SET_STATUS';
const SET_AVATAR_SUCCESS = 'SET_AVATAR_SUCCESS';

enum ContactsList {
    Facebook = 'facebook',
    Website = 'website',
    Instagram = 'instagram',
    Vk = 'vk',
    Youtube = 'youtube',
    Github = 'github',
    MainLink = 'mainLink',
    Twitter = 'twitter'
}

export type InitialStateType = {
    isProfileFetching: boolean,
    profile: ProfileType | null,
    status: string,
    posts: PostType[]
};

const initialState: InitialStateType = {
    isProfileFetching: false,
    profile: null,
    status: '',
    posts: [
        {id: 0, text: 'My first post', likesCount: 123},
        {id: 1, text: 'My second post', likesCount: 58},
        {id: 2, text: 'My third post', likesCount: 42}
    ]
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
                    ...state.profile as ProfileType,
                    photos: action.photos
                }
            };
        default:
            return state;
    }
};

export default profileReducer;

type ActionsTypes = FetchProfileActionType | AddPostActionType |
    DeletePostActionType | SetIsProfileFetchingActionType |
    SetStatusActionType | SetAvatarActionType;

type FetchProfileActionType = {
    type: typeof SET_USER_PROFILE;
    profile: ProfileType;
}
export const fetchProfileSuccess = (profile: ProfileType): FetchProfileActionType => {
    return { type: SET_USER_PROFILE, profile}
};

type AddPostActionType = {
    type: typeof ADD_POST;
    newPostText: string;
}
export const addPost = (newPostText: string): AddPostActionType => {
    return {type: ADD_POST, newPostText};
};

type DeletePostActionType = {
    type: typeof DELETE_POST;
    postId: number;
}
export const deletePost = (postId: number): DeletePostActionType => {
    return {type: DELETE_POST, postId};
};

type SetIsProfileFetchingActionType = {
    type: typeof SET_PROFILE_IS_FETCHING;
    isProfileFetching: boolean;
}
export const setIsProfileFetching = (isProfileFetching: boolean): SetIsProfileFetchingActionType => {
    return { type: SET_PROFILE_IS_FETCHING, isProfileFetching}
};

type SetStatusActionType = {
    type: typeof SET_STATUS;
    status: string;
}
export const setStatus = (status: string): SetStatusActionType => {
    return { type: SET_STATUS, status}
};

type SetAvatarActionType = {
    type: typeof SET_AVATAR_SUCCESS;
    photos: PhotosType;
}
export const saveAvatarSuccess = (photos: PhotosType): SetAvatarActionType => {
    return { type: SET_AVATAR_SUCCESS, photos}
};



//thunks
export const fetchProfile = (userId: number) => async (dispatch: any) => {
    dispatch(setIsProfileFetching(true));
    const data = await API.fetchProfile(userId);
    dispatch(fetchProfileSuccess(data));
    dispatch(setIsProfileFetching(false));

};

export const fetchStatus = (userId: number) => async (dispatch: any) => {
    const data = await API.fetchStatus(userId);
    dispatch(setStatus(data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
    const data = await API.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const saveAvatar = (avatar: any) => async (dispatch: any) => {
    const data = await API.saveAvatar(avatar);
    if (data.resultCode === 0) {
        dispatch(saveAvatarSuccess(data.data.photos));
    }
};

export const saveProfileInfo = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const data = await API.saveProfileInfo(profile);
    if (data.resultCode === 0) {
        dispatch(fetchProfile(userId));
    } else {
        const errorFormText = data.messages.length > 0 ? data.messages.join(', ') : 'Server error';

        let fieldErrors: any = {};
        for(let i = 0; i < data.messages.length; i++) {
            Object.entries(ContactsList).map((value) => {
                //value - массив ["Facebook", "facebook"]  и т.п.
                //value[0] - строки ключей (Facebook, Vk, Twitter...)
                //value[1] - строковые значений (facebook, vk, twitter...)
                if(data.messages[i].includes(value[0])) {
                    fieldErrors["contacts"] = {...fieldErrors["contacts"], [value[1]]: "Invalid link format"};
                }
            });
        }

        dispatch(stopSubmit("profileInfoEdit", {_error: errorFormText, ...fieldErrors}));

        return Promise.reject(errorFormText);
    }
};

