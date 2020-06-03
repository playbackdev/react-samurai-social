//action types
import profileReducer from "./ProfileReducer";
import dialogsReducer from "./DialogsReducer";

//store
const store = {
    _state : {
        profilePage: {
            newPostText: '',
            posts: [
                {id: 0, text: 'My first post', likesCount: 123},
                {id: 1, text: 'My second post', likesCount: 58},
                {id: 2, text: 'My third post', likesCount: 42}
            ]
        },
        dialogsPage: {
            messageText: "",
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Vasya'},
                {id: 3, name: 'Petya'},
            ],
            messages: [
                {id: 0, message: "Hi!"},
                {id: 1, own: true, message: "Hello!"},
                {id: 2, message: "How are you?"},
                {id: 3, own: true, message: "I'm fine"},
            ]
        }
    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);
    }
};

//export
window.store = store;
export default store;