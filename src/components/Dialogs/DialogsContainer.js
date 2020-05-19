import React from "react";
import Dialogs from "./Dialogs";
import {dialogSendMessage, dialogUpdateMessageText} from "../../redux/DialogsReducer";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        state: state.dialogsPage
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onInputMessageChangeHandler: (text) => { dispatch(dialogUpdateMessageText(text)); },
        sendMessageHandler: () => { dispatch(dialogSendMessage()); }
    };
};

//коннектим компоненту Dialogs к store и прокидываем в нее пропсы
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;