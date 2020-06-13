import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase, faGlobe, faIdCardAlt, faReceipt} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faGithub, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faGlobeEurope} from "@fortawesome/free-solid-svg-icons/faGlobeEurope";
import {faVk} from "@fortawesome/free-brands-svg-icons/faVk";
import React from "react";

const ProfileInfoList = ({isOwnProfile, profile, activateEditMode}) => {

    let isContactsNull = true;
    Object.entries(profile.contacts).forEach(([key, value]) => {
        if (value) {
            isContactsNull = false;
        }
    });

    return <React.Fragment>
        <h3><FontAwesomeIcon icon={faReceipt} /> Profile Description:</h3>
        <p>{profile.aboutMe || 'Отсутствует'}</p>
        <h3><FontAwesomeIcon icon={faIdCardAlt} /> Contacts:</h3>
        {profile.contacts.facebook?<p><strong><FontAwesomeIcon icon={faFacebook} /> Facebook: </strong>{profile.contacts.facebook || 'Отсутствует'}</p>:null}
        {profile.contacts.website?<p><strong><FontAwesomeIcon icon={faGlobeEurope} /> Website: </strong>{profile.contacts.website || 'Отсутствует'}</p>:null}
        {profile.contacts.vk?<p><strong><FontAwesomeIcon icon={faVk} /> VK: </strong>{profile.contacts.vk || 'Отсутствует'}</p>:null}
        {profile.contacts.twitter?<p><strong><FontAwesomeIcon icon={faTwitter} /> Twitter: </strong>{profile.contacts.twitter || 'Отсутствует'}</p>:null}
        {profile.contacts.instagram?<p><strong><FontAwesomeIcon icon={faInstagram} /> Instagram: </strong>{profile.contacts.instagram || 'Отсутствует'}</p>:null}
        {profile.contacts.youtube?<p><strong><FontAwesomeIcon icon={faYoutube} /> Youtube: </strong>{profile.contacts.youtube || 'Отсутствует'}</p>:null}
        {profile.contacts.github?<p><strong><FontAwesomeIcon icon={faGithub} /> GitHub: </strong>{profile.contacts.github || 'Отсутствует'}</p>:null}
        {profile.contacts.mainLink?<p><strong><FontAwesomeIcon icon={faGlobe} /> Main: </strong>{profile.contacts.mainLink || 'Отсутствует'}</p>:null}
        {isContactsNull?<p>Отсутствуют</p>:null}
        <h3><FontAwesomeIcon icon={faBriefcase} /> Job Search:</h3>
        <p><strong>Status: </strong>{profile.lookingForAJob ? 'В поиске' : 'Не в поиске'}</p>
        <p><strong>Description: </strong>{profile.lookingForAJobDescription || 'Нет описания'}</p>
        {isOwnProfile && <button onClick={activateEditMode}>Edit</button>}
    </React.Fragment>
};

export default ProfileInfoList;