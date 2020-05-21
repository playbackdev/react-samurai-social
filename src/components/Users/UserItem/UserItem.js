import React from "react";
import classes from '../Users.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserMinus, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import userPhotoSmall from '../../../assets/img/userPhotoSmall.png';

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
                    src={props.photo ? props.photo : userPhotoSmall }
                />
                <div className={classes.headText}>
                    <h3>{props.name}</h3>
                    <p>{'props.location.country'}, {'props.location.city'}</p>
                </div>
                <div>
                    {
                        props.followed
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