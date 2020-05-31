import React from "react";
import Profile from "./Profile";
import {fetchProfile, fetchStatus, setIsProfileFetching, updateStatus} from "../../redux/ProfileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../UI/Preloader/Preloader";

class ProfileContainer extends React.Component {

    componentDidMount() {
        const userId = this.props.match.params.userId || this.props.auth.userId;
        this.props.fetchProfile(userId);
        this.props.fetchStatus(userId);
    }

    render() {
        if(this.props.isProfileFetching || !this.props.profile) return <Preloader/>;
        return (
            <Profile {...this.props} />
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isProfileFetching: state.profilePage.isProfileFetching,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        auth: state.auth
    };
};

const mapDispatchToProps = {
    fetchProfile,
    fetchStatus,
    updateStatus,
    setIsProfileFetching
};


//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withAuthRedirect(ProfileContainer)));
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer);