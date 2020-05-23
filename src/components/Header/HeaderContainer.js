import React from "react";
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {fetchAuthUserData, setIsFetching} from "../../redux/AuthReducer";

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if(response.data.resultCode === 0) {
                    this.props.fetchAuthUserData(
                        response.data.data.id,
                        response.data.data.email,
                        response.data.data.login,
                        true);
                }

                this.props.setIsFetching(false);
            });
    }

    render() {
        return <Header {...this.props} />
    }
}


const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth
    };
};

const mapDispatchToProps = {
    fetchAuthUserData, setIsFetching
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);