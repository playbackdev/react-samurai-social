import React from "react";
import {connect} from "react-redux";
import {followUser, getUsers, unfollowUser} from "../../redux/UsersReducer";
import Users from "./Users";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    followUser = (userId, callback) => {
        this.props.followUser(userId, callback);
    };

    unfollowUser = (userId, callback) => {
        this.props.unfollowUser(userId, callback);
    };

    onPageChanged = (pageNum) => {
        this.props.getUsers(pageNum, this.props.pageSize);
    };

    render() {
        return (
            <Users
                users={this.props.users}
                currentPage={this.props.currentPage}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                followUser={this.followUser}
                unfollowUser={this.unfollowUser}
                onPageChanged={this.onPageChanged}
                isFetching={this.props.isFetching}
            />
        );
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    };
};

const mapDispatchToProps = {
    followUser,
    unfollowUser,
    getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);