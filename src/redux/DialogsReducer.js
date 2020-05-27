const DIALOG_SEND_MESSAGE = 'DIALOG_SEND_MESSAGE';

const initialState = {
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
        case DIALOG_SEND_MESSAGE:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        id: state.messages.length,
                        own: true,
                        message: action.messageText
                    }
                ],
                messageText: ''
            };
        default:
            return state;
    }
};

export default dialogsReducer;

export const dialogSendMessage = (messageText) => {
    return {type: DIALOG_SEND_MESSAGE, messageText};
};