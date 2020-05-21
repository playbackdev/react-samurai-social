import React from "react";
import classes from './Users.module.scss'
import UserItem from "./UserItem/UserItem";
import Paginator from "../UI/Paginator/Paginator";
import loader from '../../assets/img/Loader.svg';
import Preloader from "../UI/Preloader/Preloader";

const Users = (props) => {

    const followUser = (userId) => {
        props.followUser(userId);
    };

    const unfollowUser = (userId) => {
        props.unfollowUser(userId);
    };

    const onPageChanged = (pageNum) => {
        props.onPageChanged(pageNum);

    };

    let pages = Math.ceil(props.totalUsersCount / props.pageSize);

    return (
        <div className={classes.Users}>
            <h3>Users</h3>
            <p>Всего пользователей: {props.totalUsersCount}</p>
            <Paginator
                currentPage={props.currentPage}
                pagesCount={pages}
                onPageChanged={onPageChanged}
            />
            {props.isFetching ? <Preloader/> :
                <div className={classes.usersList}>
                    {
                        props.users.map((user) => {
                            return (
                                <UserItem
                                    key={user.id}
                                    id={user.id}
                                    name={user.name}
                                    photo={user.photos.small}
                                    followed={user.followed}
                                    status={user.status}
                                    location={'user.location'}
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
            }
            <Paginator
                currentPage={props.currentPage}
                pagesCount={pages}
                onPageChanged={onPageChanged}
            />
        </div>
    );
};

export default Users;