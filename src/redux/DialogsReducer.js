const DIALOG_UPDATE_MESSAGE_TEXT = 'DIALOG_UPDATE_MESSAGE_TEXT';
const DIALOG_SEND_MESSAGE = 'DIALOG_SEND_MESSAGE';

const initialState = {
    messageText: "",
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Vasich'},
        {id: 3, name: 'Petich'},
        {id: 4, name: 'Vasich'},
        {id: 5, name: 'Gadich'},
        {id: 6, name: 'Yarich'},
        {id: 7, name: 'Zurich'},
        {id: 8, name: 'Petech'}
    ],
    messages: [
        {id: 0, message: "Hi!"},
        {id: 1, own: true, message: "Hello!"},
        {id: 2, message: "How are you?"},
        {id: 3, own: true, message: "I'm fine, and what about you?"},
        {id: 4, message: "Very super! super! super! super! super! super! super!"},
        {id: 5, own: true, message: "thats goooood!"}
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DIALOG_UPDATE_MESSAGE_TEXT:
            return {
                ...state,
                messageText: action.text
            };
        case DIALOG_SEND_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id: state.messages.length,
                        own: true,
                        message: state.messageText
                    }
                ],
                messageText: ''
            };
        default:
            return state;
    }
};

export default dialogsReducer;

export const dialogUpdateMessageText = (text) => {
    return {type: DIALOG_UPDATE_MESSAGE_TEXT, text: text};
};

export const dialogSendMessage = () => {
    return {type: DIALOG_SEND_MESSAGE};
};