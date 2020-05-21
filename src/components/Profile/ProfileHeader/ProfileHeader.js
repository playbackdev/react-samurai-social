import React from "react";
import classes from './ProfileHeader.module.scss'
import UserPhotoSmall from '../../../assets/img/userPhotoSmall.png'

const ProfileHeader = (props) => {
    return (
        <div className={classes.profileHeader}>
            <div className={classes.wallpaper}>
            <img alt=""
                 src='https://upload.wikimedia.org/wikipedia/commons/4/45/Wide_lightning.jpg'
            />
            </div>
            <img alt="" className={classes.avatar}
                 src={props.avatar || UserPhotoSmall}
            />
            <h1>{props.fullName}</h1>
        </div>
    );
};

export default ProfileHeader;