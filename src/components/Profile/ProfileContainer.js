import React from "react";
import Profile from "./Profile";
import * as axios from "axios";
import {fetchUserProfile, setIsFetching} from "../../redux/ProfileReducer";
import {connect} from "react-redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/3`)
            .then(response => {
                this.props.fetchUserProfile(response.data);
                setIsFetching(false);
            });
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isFetching: state.profilePage.isFetching,
        profile: state.profilePage.profile
    };
};

const mapDispatchToProps = {
    fetchUserProfile, setIsFetching
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);