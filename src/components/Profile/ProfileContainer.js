import React from "react";
import Profile from "./Profile";
import {fetchProfile, setIsFetching} from "../../redux/ProfileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.fetchProfile(this.props.match.params.userId || 2);
    }

    render() {
        return (
            <Profile {...this.props} />
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
    fetchProfile, setIsFetching
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer));