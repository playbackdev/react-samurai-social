import React from "react";
import {connect} from "react-redux";
import {fetchUsers, toggleFollowUser} from "../../redux/UsersReducer";
import Users from "./Users";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/reduxStore";

type MapStatePropsType = {
    pageSize: number
    users: Array<UserType>
    totalUsersCount: number
    areUsersFetching: boolean
    currentPage: number
};
type MapDispatchPropsType = {
    fetchUsers: (currentPage: number, pageSize: number) => void
    toggleFollowUser: (userId: number, follow: boolean, callback: () => void ) => void
};
type OwnPropsType = {
    userId: number
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.fetchUsers(this.props.currentPage, this.props.pageSize);
    }

    toggleFollowUser = (userId: number, follow: boolean, callback: () => void) => {
        this.props.toggleFollowUser(userId, follow, callback);
    };

    onPageChanged = (pageNum: number) => {
        this.props.fetchUsers(pageNum, this.props.pageSize);
    };

    render() {
        return (
            <Users
                users={this.props.users}
                currentPage={this.props.currentPage}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                toggleFollowUser={this.toggleFollowUser}
                onPageChanged={this.onPageChanged}
                areUsersFetching={this.props.areUsersFetching}
            />
        );
    }
}


const mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        areUsersFetching: state.usersPage.areUsersFetching
    };
};

const mapDispatchToProps = {
    toggleFollowUser,
    fetchUsers
};

//export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
export default compose(
    //TStateProps, TDispatchProps, TOwnProps, State = DefaultRootState
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer);