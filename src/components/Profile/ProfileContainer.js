import React from "react";
import Profile from "./Profile";
import * as axios from "axios";
import {fetchUserProfile, setIsFetching} from "../../redux/ProfileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class ProfileContainer extends React.Component {

    componentDidMount() {
        setIsFetching(true);
        //грузим профиль с урла или если его нет, то по умолчанию свой
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.match.params.userId || 2}`)
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer));