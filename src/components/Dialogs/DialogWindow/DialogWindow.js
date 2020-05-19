import React, {useEffect} from "react";
import classes from "../Dialogs.module.scss";
import Message from "../Message/Message";

const DialogsWindow = (props) => {

    /* Автоматическая прокрутка вниз диалога при добавлении нового сообщения */
    const messagesWindow = React.useRef();
    useEffect( () => {
        if(messagesWindow) {
            messagesWindow.current.scrollTop = messagesWindow.current.scrollHeight;
        }
    });

    return (
        <div ref={messagesWindow} className={classes.dialogPanel}>
            <div className={classes.messagesWindow}>
                {
                    props.messages.map(m => <Message key={m.id} own={m.own} text={m.message}/>)
                }
            </div>
        </div>
    );
};

export default DialogsWindow;