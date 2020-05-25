import React from "react";
import classes from './Dialogs.module.scss'
import DialogHeader from "./DialogHeader/DialogHeader";
import DialogMessageForm from "./DialogMessageForm/DialogMessageForm";
import DialogsList from "./DialogsList/DialogsList";
import DialogsWindow from "./DialogWindow/DialogWindow";

const Dialogs = (props) => {


    const sendMessageHandler = (e) => {
        e.preventDefault();
        if(e.target.firstChild.value === '') return;
        props.sendMessageHandler(e.target.firstChild.value);
    };

    const onInputMessageChangeHandler = (e) => {
        props.onInputMessageChangeHandler(e.target.value);
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
            <DialogMessageForm
                sendMessageHandler={sendMessageHandler}
                onInputMessageChangeHandler={onInputMessageChangeHandler}
                messageText={props.state.messageText}
            />
        </div>
    );
};

export default Dialogs;