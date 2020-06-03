import React from "react";
import {connect} from "react-redux";
import {fetchUsers, toggleFollowUser} from "../../redux/UsersReducer";
import Users from "./Users";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.fetchUsers(this.props.currentPage, this.props.pageSize);
    }

    toggleFollowUser = (userId, follow, callback) => {
        this.props.toggleFollowUser(userId, follow, callback);
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
                toggleFollowUser={this.toggleFollowUser}
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
    toggleFollowUser,
    fetchUsers
};

//export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(UsersContainer);