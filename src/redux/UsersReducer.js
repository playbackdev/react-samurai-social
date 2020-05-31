import {API} from "../api/api";

const USER_FOLLOW = 'USER_FOLLOW';
const USER_UNFOLLOW = 'USER_UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_ARE_FETCHING = 'SET_USERS_ARE_FETCHING';

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    areUsersFetching: false
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS:
            return {
                ...state,
                users: [...action.users],
                totalUsersCount: action.totalCount
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case USER_FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    return user.id === action.userId
                        ? {
                            ...user,
                            followed: true
                        }: user;
                })
            };
        case USER_UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    return user.id === action.userId
                        ? {
                            ...user,
                            followed: false
                        }: user;
                })
            };
        case SET_USERS_ARE_FETCHING:
            return {
                ...state,
                areUsersFetching: action.areUsersFetching

            };
        default:
            return state;
    }
};


export const followSuccess = (userId) => {
    return {type: USER_FOLLOW, userId};
};

export const unfollowSuccess = (userId) => {
    return {type: USER_UNFOLLOW, userId};
};

export const setUsers = (users, totalCount) => {
    return {type: SET_USERS, users, totalCount};
};

export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
};

export const setUsersAreFetching = (areUsersFetching) => {
    return {type: SET_USERS_ARE_FETCHING, areUsersFetching}
};

//thunks
export const fetchUsers = (page, pageSize) => {
    return (dispatch) => {
        dispatch(setUsersAreFetching(true));
        API.getUsers(page, pageSize)
            .then(data => {
                dispatch(setUsers(data.items, data.totalCount));
                dispatch(setCurrentPage(page));
                dispatch(setUsersAreFetching(false));
            });
    };
};

export const followUser = (userId, callback) => {
    return (dispatch) => {
        API.followUser(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(followSuccess(userId));
            }
            callback();
        });
    };
};

export const unfollowUser = (userId, callback) => {
    return (dispatch) => {
        API.unfollowUser(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowSuccess(userId));

            }
            callback();
        });
    };
};

export default usersReducer;