import React from "react";
import classes from './Users.module.scss'
import UserItem from "./UserItem";
import Paginator from "../UI/Paginator/Paginator";
import Preloader from "../UI/Preloader/Preloader";

const Users = (props) => {
    const followUser = (userId, callback) => {
        props.followUser(userId, callback);
    };

    const unfollowUser = (userId, callback) => {
        props.unfollowUser(userId, callback);
    };

    const onPageChanged = (pageNum) => {
        props.onPageChanged(pageNum);

    };

    let pages = Math.ceil(props.totalUsersCount / props.pageSize);

    return (
        <div className={classes.Users}>
            <h3>Users</h3>
            {props.users.length ?
                <p>Всего найдено пользователей: {props.totalUsersCount}</p>
            :null}
            <Paginator
                isFetching={props.areUsersFetching}
                currentPage={props.currentPage}
                pagesCount={pages}
                onPageChanged={onPageChanged}
            />
            {props.areUsersFetching ? <Preloader/> :
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
                        props.users.length % 3 === 2
                            ? <div className={classes.dummy}></div>
                            : props.users.length % 3 === 1
                            ? <React.Fragment>
                                <div className={classes.dummy}></div>
                                <div className={classes.dummy}></div>
                            </React.Fragment>
                            : /*props.users.length % 3 === 1
                                ? <React.Fragment>
                                    <div className={classes.dummy}></div>
                                    <div className={classes.dummy}></div>
                                    <div className={classes.dummy}></div>
                                </React.Fragment> :*/ null
                    }
                </div>
            }
            <Paginator
                isFetching={props.areUsersFetching}
                currentPage={props.currentPage}
                pagesCount={pages}
                onPageChanged={onPageChanged}
            />
        </div>
    );
};

export default Users;