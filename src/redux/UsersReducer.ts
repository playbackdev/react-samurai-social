import {API} from "../api/api";
import {UserType} from "../types/types";

const USER_TOGGLE_FOLLOW = 'user/USER_TOGGLE_FOLLOW';
const SET_USERS = 'user/SET_USERS';
const SET_CURRENT_PAGE = 'user/SET_CURRENT_PAGE';
const SET_USERS_ARE_FETCHING = 'user/SET_USERS_ARE_FETCHING';



type InitialStateType = typeof initialState;

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    areUsersFetching: false
};

const usersReducer = (state: InitialStateType = initialState, action: UsersReducerActionTypes): InitialStateType => {
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

type UsersReducerActionTypes = UserToggleFollowActionType | SetUsersActionType | SetCurrentPageActionType | SetUsersAreFetchingActionType;

type UserToggleFollowActionType = {
    type: typeof USER_TOGGLE_FOLLOW
    userId: number
    isFollow: boolean
}
export const toggleFollowSuccess = (userId: number, isFollow: boolean): UserToggleFollowActionType => {
    return {type: USER_TOGGLE_FOLLOW, userId, isFollow};
};

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
    totalCount: number
}
export const setUsers = (users: Array<UserType>, totalCount: number): SetUsersActionType => {
    return {type: SET_USERS, users, totalCount};
};

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
    return {type: SET_CURRENT_PAGE, currentPage}
};

type SetUsersAreFetchingActionType = {
    type: typeof SET_USERS_ARE_FETCHING
    areUsersFetching: boolean
}
export const setUsersAreFetching = (areUsersFetching: boolean) : SetUsersAreFetchingActionType=> {
    return {type: SET_USERS_ARE_FETCHING, areUsersFetching}
};

//thunks
export const fetchUsers = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setUsersAreFetching(true));
    const data = await API.getUsers(page, pageSize)
    dispatch(setUsers(data.items, data.totalCount));
    dispatch(setCurrentPage(page));
    dispatch(setUsersAreFetching(false));
};

export const toggleFollowUser = (userId: number, isFollow: boolean, answerHandler: (...rest: any[]) => void) => async (dispatch: any) => {
    const data = isFollow ? await API.followUser(userId) : await API.unfollowUser(userId);
    if (data.resultCode === 0) {
        dispatch(toggleFollowSuccess(userId, isFollow));
    }
    answerHandler();
};

export default usersReducer;