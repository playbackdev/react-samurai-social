import React from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {fetchUsersAC, followUserAC, unfollowUserAC} from "../../redux/UsersReducer";

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (userId) => { dispatch(followUserAC(userId)); },
        unFollowUser: (userId) => { dispatch(unfollowUserAC(userId)); },
        fetchUsers: (users) => { dispatch(fetchUsersAC(users)); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);