import React from "react";
import classes from './Users.module.scss'
import UserItem from "./UserItem";
import Paginator from "../UI/Paginator/Paginator";
import Preloader from "../UI/Preloader/Preloader";
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    users: Array<UserType>
    areUsersFetching: boolean
    currentPage: number
    onPageChanged: (pageNum: number) => void
    toggleFollowUser: (userId: number, follow: boolean, callback: () => void ) => void
}

const Users: React.FC<PropsType> = (props) => {

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
                onPageChanged={props.onPageChanged}
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
                                    toggleFollowUser={props.toggleFollowUser}
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
                onPageChanged={props.onPageChanged}
            />
        </div>
    );
};

export default Users;