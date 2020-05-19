const USER_FOLLOW = 'USER_FOLLOW';
const USER_UNFOLLOW = 'USER_UNFOLLOW';
const FETCH_USERS = 'FETCH_USERS';

const initialState = {
    users: [
        {id: 1,  photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: true, fullName: 'Dmitry Vasilievich', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {id: 2,  photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: false, fullName: 'Petya Petrovich', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {id: 3,  photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: false, fullName: 'Ivan Ivanovich', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {id: 4,  photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: true, fullName: 'German Palych', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {id: 5,  photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: false, fullName: 'Sofya Dmitrievna', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {id: 6,  photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: true, fullName: 'Kate Vasilievna', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Kyiv', country: 'Ukraine'}
        },
        {id: 7,  photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: false, fullName: 'Vasya Vasilevich', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {id: 8,  photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: false, fullName: 'Vera Pavlovna', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Moscow', country: 'Russia'}
        },
        {id: 9,  photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: true, fullName: 'Kostya Petrovich', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Kyiv', country: 'Ukraine'}
        },
        {id: 10, photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: true, fullName: 'Anton Ivanych', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {id: 11, photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: false, fullName: 'Andrey Vasgenovich', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Kyiv', country: 'Ukraine'}
        },
        {id: 12, photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: true, fullName: 'David Blaine', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'USA', country: 'New-York'}
        },
        {id: 13, photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: false, fullName: 'Obi-Wan Kenobi', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Tatooine', country: 'Universe'}
        },
        {id: 14, photoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91oqKABg6yL._SL1500_.jpg',
            following: true, fullName: 'Anakin Skywalker', status: 'Lorem ipsum dolor sit amet, consectetur',
            location: {city: 'Tatooine', country: 'Universe'}
        },
    ]
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            };
        case USER_FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    return user.id === action.userId
                        ? {
                            ...user,
                            following: true
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
                            following: false
                        }: user;
                })
            };
        default:
            return state;
    }
};


export const followUserAC = (userId) => {
    return {type: USER_FOLLOW, userId};
};

export const unfollowUserAC = (userId) => {
    return {type: USER_UNFOLLOW, userId};
};

export const fetchUsersAC = (userId) => {
    return {type: FETCH_USERS};
};

export default usersReducer;