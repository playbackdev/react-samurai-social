import React from "react";
import classes from './Dialogs.module.scss'
import DialogHeader from "./DialogHeader/DialogHeader";
import DialogMessageForm from "./DialogMessageForm/DialogMessageForm";
import DialogsList from "./DialogsList/DialogsList";
import DialogsWindow from "./DialogWindow/DialogWindow";
import {reset} from 'redux-form';

const Dialogs = (props) => {


    const sendMessageHandler = (formData, dispatch) => {
        props.dialogSendMessage(formData.messageText);
        dispatch(reset('sendMessage'));
    };

    /* Кнопка скрытия блока списка диалогов */
    const dialogsListEl = React.useRef();
    const toggleDialogsListMenu = () => {
        if(dialogsListEl) {
            if (dialogsListEl.current.classList.contains(classes.hide)) {
                dialogsListEl.current.classList.remove(classes.hide);
                return 1;
            } else {
                dialogsListEl.current.classList.add(classes.hide);
            }
        }
    };

    return (
        <div className={classes.Dialogs}>
            {/* Header */}
            <DialogHeader toggleDialogsListMenu={toggleDialogsListMenu} />
            {/* Content */}
            <div className={classes.content}>
                <DialogsList
                    dialogsListEl={dialogsListEl}
                    dialogs={props.state.dialogs}
                />
                <DialogsWindow
                    messages={props.state.messages}
                />
            </div>
            {/* Footer */}
            <DialogMessageForm onSubmit={sendMessageHandler}
            />
        </div>
    );
};

export default Dialogs;