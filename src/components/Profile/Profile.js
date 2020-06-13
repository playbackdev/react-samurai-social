import React from "react";
import classes from './Profile.module.scss'
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";

const Profile = (props) => {
    return (
        <div className={classes.content}>
            <ProfileHeader
                isOwnProfile={!props.match.params.userId}
                fullName={props.profile.fullName}
                avatar={props.profile.photos.large}
                status={props.status}
                updateStatus={props.updateStatus}
                saveAvatar={props.saveAvatar}
            />
            <div className={classes.profileContent}>
                <ProfileInfo
                    isOwnProfile={!props.match.params.userId}
                    profile={props.profile}
                    saveProfileInfo={props.saveProfileInfo}
                />
                <PostsContainer/>
            </div>
        </div>
    );
};

export default Profile;