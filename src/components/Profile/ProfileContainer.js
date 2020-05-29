import React from "react";
import Profile from "./Profile";
import {fetchProfile, fetchStatus, setIsFetching, updateStatus} from "../../redux/ProfileReducer";
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
        if(this.props.isFetching || !this.props.profile) return <Preloader/>;
        return (
            <Profile {...this.props} />
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isFetching: state.profilePage.isFetching,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        auth: state.auth
    };
};

const mapDispatchToProps = {
    fetchProfile,
    fetchStatus,
    updateStatus,
    setIsFetching
};


//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withAuthRedirect(ProfileContainer)));
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer);