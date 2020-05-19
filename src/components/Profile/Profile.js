import React from "react";
import classes from './Profile.module.scss'
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";

const Profile = () => {
    return (
        <div className={classes.content}>
            <ProfileHeader/>
            <div className={classes.profileContent}>
                <ProfileInfo/>
                <PostsContainer/>
            </div>
        </div>
    );
};

export default Profile;