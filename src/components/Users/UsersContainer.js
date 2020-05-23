import React from "react";
import {connect} from "react-redux";
import {fetchUsers, followUser, setCurrentPage, setIsFetching, unfollowUser} from "../../redux/UsersReducer";
import Users from "./Users";
import {API} from "../../api/api";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        API.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.fetchUsers(data.items,
                    data.totalCount);
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
        API.getUsers(pageNum, this.props.pageSize).then(data => {
                this.props.fetchUsers(
                    data.items,
                    data.totalCount);
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