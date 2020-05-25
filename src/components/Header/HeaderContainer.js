import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {authMe} from "../../redux/AuthReducer";

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.authMe();
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
    authMe
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);