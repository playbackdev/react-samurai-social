import React from "react";
import Profile from "./Profile";
import {
    fetchProfile,
    fetchStatus,
    saveAvatar,
    saveProfileInfo,
    setIsProfileFetching,
    updateStatus
} from "../../redux/ProfileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import Preloader from "../UI/Preloader/Preloader";

class ProfileContainer extends React.Component {

    loadProfile = () => {
        const userId = this.props.match.params.userId || this.props.auth.userId || null;
        if(!userId) {
            this.props.history.push("/login");
        }
        this.props.fetchProfile(userId);
        this.props.fetchStatus(userId);
    };

    componentDidMount() {
        this.loadProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.userId !== this.props.match.params.userId) {
            this.loadProfile();
        }
    }

    render() {
        //если убрать проверку на isProfileFetching, профиль будет обновляться при изменении информации
        //без крутилки прелоадера (что не очень красиво, я считаю)
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
    setIsProfileFetching,
    saveAvatar,
    saveProfileInfo
};


//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withAuthRedirect(ProfileContainer)));
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer);