import React from "react";
import {connect} from "react-redux";
import {fetchUsers, followUser, unfollowUser} from "../../redux/UsersReducer";
import Users from "./Users";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.fetchUsers(this.props.currentPage, this.props.pageSize);
    }

    followUser = (userId, callback) => {
        this.props.followUser(userId, callback);
    };

    unfollowUser = (userId, callback) => {
        this.props.unfollowUser(userId, callback);
    };

    onPageChanged = (pageNum) => {
        this.props.fetchUsers(pageNum, this.props.pageSize);
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
                areUsersFetching={this.props.areUsersFetching}
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
        areUsersFetching: state.usersPage.areUsersFetching
    };
};

const mapDispatchToProps = {
    followUser,
    unfollowUser,
    fetchUsers
};

//export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer);