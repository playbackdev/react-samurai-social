const USER_FOLLOW = 'USER_FOLLOW';
const USER_UNFOLLOW = 'USER_UNFOLLOW';
const FETCH_USERS = 'FETCH_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_IS_FETCHING = 'SET_USERS_IS_FETCHING';

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS:
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
        case SET_USERS_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching

            };
        default:
            return state;
    }
};


export const followUser = (userId) => {
    return {type: USER_FOLLOW, userId};
};

export const unfollowUser = (userId) => {
    return {type: USER_UNFOLLOW, userId};
};

export const fetchUsers = (users, totalCount) => {
    return {type: FETCH_USERS, users, totalCount};
};

export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
};

export const setIsFetching = (isFetching) => {
    return {type: SET_USERS_IS_FETCHING, isFetching}
};

export default usersReducer;