import React from "react";
import classes from './ProfileInfo.module.scss'
import {faBriefcase, faGlobe, faIdCardAlt, faReceipt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faGlobeEurope} from "@fortawesome/free-solid-svg-icons/faGlobeEurope";
import {faVk} from "@fortawesome/free-brands-svg-icons/faVk";

const ProfileInfo = (props) => {
    return (
        <div className={classes.profileInfo}>
            <h3><FontAwesomeIcon icon={faReceipt} /> Profile Description:</h3>
            <p>{props.profile.aboutMe || 'Отсутствует'}</p>
            <h3><FontAwesomeIcon icon={faIdCardAlt} /> Contacts:</h3>
            <p><strong><FontAwesomeIcon icon={faFacebook} /> Facebook: </strong>{props.profile.contacts.facebook || 'Отсутствует'}</p>
            <p><strong><FontAwesomeIcon icon={faGlobeEurope} /> Website: </strong>{props.profile.contacts.website || 'Отсутствует'}</p>
            <p><strong><FontAwesomeIcon icon={faVk} /> VK: </strong>{props.profile.contacts.vk || 'Отсутствует'}</p>
            <p><strong><FontAwesomeIcon icon={faTwitter} /> Twitter: </strong>{props.profile.contacts.twitter || 'Отсутствует'}</p>
            <p><strong><FontAwesomeIcon icon={faInstagram} /> Instagram: </strong>{props.profile.contacts.instagram || 'Отсутствует'}</p>
            <p><strong><FontAwesomeIcon icon={faYoutube} /> Youtube: </strong>{props.profile.contacts.youtube || 'Отсутствует'}</p>
            <p><strong><FontAwesomeIcon icon={faGithub} /> GitHub: </strong>{props.profile.contacts.github || 'Отсутствует'}</p>
            <p><strong><FontAwesomeIcon icon={faGlobe} /> Main: </strong>{props.profile.contacts.mainLink || 'Отсутствует'}</p>
            <h3><FontAwesomeIcon icon={faBriefcase} /> Job Search:</h3>
            <p><strong>Status: </strong>{props.profile.lookingForAJob ? 'В поиске' : 'Не в поиске'}</p>
            <p><strong>Description: </strong>{props.profile.lookingForAJobDescription || 'Нет описания'}</p>
        </div>
    );
};

export default ProfileInfo;