import React from "react";
import classes from './Users.module.scss'
import UserItem from "./UserItem/UserItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const Users = (props) => {

    const followUser = (userId) => {
        props.followUser(userId);
    };

    const unfollowUser = (userId) => {
        props.unFollowUser(userId);
    };

    return (
        <div className={classes.Users}>
            <h3>Users</h3>
            <div className={classes.usersList}>
                {
                    props.users.map((user) => {
                        return (
                            <UserItem
                                key={user.id}
                                id={user.id}
                                fullName={user.fullName}
                                photoUrl={user.photoUrl}
                                following={user.following}
                                status={user.status}
                                location={user.location}
                                followUser={followUser}
                                unfollowUser={unfollowUser}
                            />
                        )
                    })
                }
                {/*Заглушки для красивой верстки*/}
                {
                    props.users.length % 4 === 3
                        ? <div className={classes.dummy}></div>
                    : props.users.length % 4 === 2
                        ? <React.Fragment>
                            <div className={classes.dummy}></div>
                            <div className={classes.dummy}></div>
                        </React.Fragment>
                    : props.users.length % 4 === 1
                        ? <React.Fragment>
                            <div className={classes.dummy}></div>
                            <div className={classes.dummy}></div>
                            <div className={classes.dummy}></div>
                        </React.Fragment> : null
                }
            </div>
            <button>
                <FontAwesomeIcon icon={faPlus}/>&nbsp;
                Show more...
            </button>
        </div>
    );
};

export default Users;