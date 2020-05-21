import React from "react";
import classes from '../Users.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserMinus, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import userPhotoSmall from '../../../assets/img/userPhotoSmall.png';
import {NavLink} from "react-router-dom";

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
                <NavLink to={'/profile/' + props.id}>
                    <img
                        src={props.photo ? props.photo : userPhotoSmall}
                    />
                </NavLink>
                <div className={classes.headText}>
                    <NavLink to={'/profile/' + props.id}>
                        <h3>{props.name}</h3>
                    </NavLink>
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