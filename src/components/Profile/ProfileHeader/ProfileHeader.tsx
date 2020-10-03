import React, {ChangeEvent, useEffect, useState} from "react";
import classes from './ProfileHeader.module.scss'
import UserPhotoSmall from '../../../assets/img/userPhotoSmall.png'
import ProfileStatus from "./ProfileStatus";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCameraRetro, faSpinner} from "@fortawesome/free-solid-svg-icons";

type PropsType = {
    isOwnProfile: boolean
    fullName: string
    avatar: string
    status: string
    updateStatus: (status: string) => void
    saveAvatar: (avatar: File) => void
}

const  ProfileHeader: React.FC<PropsType> = (props) => {

    const [isAvatarUploading, setIsAvatarUploading] = useState(false);

    useEffect(() => {
        if(isAvatarUploading) {
            setIsAvatarUploading(false);
        }
    }, [props.avatar]);

    const avatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            setIsAvatarUploading(true);
            props.saveAvatar(e.target.files[0]);
        }
    };

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
            {props.isOwnProfile && <div className={classes.loadAvatar}>
                <input
                    disabled={isAvatarUploading}
                    onChange={avatarSelected}
                    id={"inputAvatar"}
                    name={"inputAvatar"}
                    type={'file'}
                />
                {isAvatarUploading?<label className={classes.loading} htmlFor={"inputAvatar"}>
                    <FontAwesomeIcon icon={faSpinner} title={"Loading..."}/>
                </label>
                    :<label htmlFor={"inputAvatar"}>
                        <FontAwesomeIcon icon={faCameraRetro} title={"Upload Avatar"}/>
                    </label>}
            </div>}
            <h1>{props.fullName}</h1>
            <ProfileStatus
                status={props.status}
                updateStatus={props.updateStatus}
                isOwnProfile={props.isOwnProfile}
            />
        </div>
    );
};

export default ProfileHeader;

