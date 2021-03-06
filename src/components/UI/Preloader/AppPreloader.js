import React from "react";
import Preloader from "./Preloader";
import classes from "./AppPreloader.module.scss";

const AppPreloader = () => {
    return (
        <div className={classes.AppPreloader}>
            <div className={classes.loader}>
                <Preloader/>
            </div>
        </div>
    );
};

export default AppPreloader;