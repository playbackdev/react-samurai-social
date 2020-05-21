import React from "react";
import loader from "../../../assets/img/Loader.svg";
import classes from './Preloader.module.scss'

const Preloader = () => {
    return (<img  className={classes.Preloader} width="100px" height="100px" alt="" src={loader}/>);
};

export default Preloader;