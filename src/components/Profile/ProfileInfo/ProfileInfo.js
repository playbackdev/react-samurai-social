import React from "react";
import classes from './ProfileInfo.module.scss'

const ProfileInfo = (props) => {
    return (
        <div className={classes.profileInfo}>
            <p>About: <strong>{props.profile.aboutMe || 'Отсутствует'}</strong></p>
            <p>Facebook: <strong>{props.profile.contacts.facebook || 'Отсутствует'}</strong></p>
            <p>website: <strong>{props.profile.contacts.website || 'Отсутствует'}</strong></p>
            <p>vk: <strong>{props.profile.contacts.vk || 'Отсутствует'}</strong></p>
            <p>twitter: <strong>{props.profile.contacts.twitter || 'Отсутствует'}</strong></p>
            <p>instagram: <strong>{props.profile.contacts.instagram || 'Отсутствует'}</strong></p>
            <p>youtube: <strong>{props.profile.contacts.youtube || 'Отсутствует'}</strong></p>
            <p>github: <strong>{props.profile.contacts.github || 'Отсутствует'}</strong></p>
            <p>mainLink: <strong>{props.profile.contacts.mainLink || 'Отсутствует'}</strong></p>
            <p>lookingForAJob: <strong>{props.profile.lookingForAJob ? 'Да' : 'Нет'}</strong></p>
            <p>lookingForAJobDesc: <strong>{props.profile.lookingForAJobDescription || 'Нет описания'}</strong></p>
        </div>
    );
};

export default ProfileInfo;