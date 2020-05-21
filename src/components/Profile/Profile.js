import React from "react";
import classes from './Profile.module.scss'
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../UI/Preloader/Preloader";

const Profile = (props) => {

    if(props.isFetching || !props.profile) return <Preloader/>;

    return (
                <div className={classes.content}>
                    <ProfileHeader
                        fullName={props.profile.fullName}
                        avatar={props.profile.photos.large}
                    />
                    <div className={classes.profileContent}>
                        <ProfileInfo profile={props.profile}/>
                        <PostsContainer/>
                    </div>
                </div>
    );
};

export default Profile;