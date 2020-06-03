import {API} from "../api/api";

const USER_TOGGLE_FOLLOW = 'user/USER_TOGGLE_FOLLOW';
const USER_UNFOLLOW = 'user/USER_UNFOLLOW';
const SET_USERS = 'user/SET_USERS';
const SET_CURRENT_PAGE = 'user/SET_CURRENT_PAGE';
const SET_USERS_ARE_FETCHING = 'user/SET_USERS_ARE_FETCHING';

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
        case USER_TOGGLE_FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    return user.id === action.userId
                        ? {
                            ...user,
                            followed: action.isFollow
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


export const toggleFollowSuccess = (userId, isFollow) => {
    return {type: USER_TOGGLE_FOLLOW, userId, isFollow};
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
export const fetchUsers = (page, pageSize) => async dispatch => {
    dispatch(setUsersAreFetching(true));
    const data = await API.getUsers(page, pageSize)
    dispatch(setUsers(data.items, data.totalCount));
    dispatch(setCurrentPage(page));
    dispatch(setUsersAreFetching(false));
};

export const toggleFollowUser = (userId, isFollow, answerHandler) => async dispatch => {
    const data = isFollow ? await API.followUser(userId) : await API.unfollowUser(userId);
    if (data.resultCode === 0) {
        dispatch(toggleFollowSuccess(userId, isFollow));
    }
    answerHandler();
};

export default usersReducer;