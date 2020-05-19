import React from "react";
import classes from '../Users.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserMinus, faUserPlus} from "@fortawesome/free-solid-svg-icons";

const UserItem = (props) => {

    const followUser = () => {
        props.followUser(props.id);
    };

    const unfollowUser = () => {
        props.unfollowUser(props.id);
    };

    return (
        <div className={classes.UserItem}>
            <div className={classes.head}>
                <img
                    src={props.photoUrl}
                />
                <div className={classes.headText}>
                    <h3>{props.fullName}</h3>
                    <p>{props.location.country}, {props.location.city}</p>
                </div>
                <div>
                    {
                        props.following
                            ? <button
                                className={classes.unfollow}
                                onClick={unfollowUser}
                            >
                                <FontAwesomeIcon icon={faUserMinus}/>&nbsp;
                                Unfollow
                            </button>
                            :
                            <button
                                className={classes.follow}
                                onClick={followUser}
                            >
                                <FontAwesomeIcon icon={faUserPlus}/>&nbsp;
                                Follow
                            </button>
                    }

                </div>
            </div>
            <p>{props.status}</p>
        </div>
    );
};

export default UserItem;