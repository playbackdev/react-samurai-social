import React, {useEffect, useState} from "react";
import classes from "./Popup.module.scss";
import cn from "classnames";

export const Popup = ({message, className, timeout = 3000}) => {

    const [showPopup, setShowPopup] = useState(false);

    useEffect( () => {
        setShowPopup(true);
        const hidePopupTimer = setTimeout(() => {
            setShowPopup(false);
        }, timeout);
        return () => clearTimeout(hidePopupTimer);
    }, [message]);

    if(!showPopup) return null;
    return (
        <div className={ cn(classes.Popup, {[classes[className]]: !!className}) }>
            <p>
            {message}
            </p>
        </div>
    );
};