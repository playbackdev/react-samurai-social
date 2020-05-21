import React from "react";
import {connect} from "react-redux";
import {fetchUsers, followUser, setCurrentPage, setIsFetching, unfollowUser} from "../../redux/UsersReducer";
import * as axios from "axios";
import Users from "./Users";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.fetchUsers(response.data.items,
                    response.data.totalCount);
                this.props.setIsFetching(false);
            });
    }

    followUser = (userId) => {
        this.props.followUser(userId);
    };

    unfollowUser = (userId) => {
        this.props.unfollowUser(userId);
    };

    onPageChanged = (pageNum) => {
        this.props.setIsFetching(true);
        this.props.setCurrentPage(pageNum);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNum}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.fetchUsers(
                    response.data.items,
                    response.data.totalCount);
                this.props.setIsFetching(false);
            });
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
    fetchUsers,
    setCurrentPage,
    setIsFetching
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);