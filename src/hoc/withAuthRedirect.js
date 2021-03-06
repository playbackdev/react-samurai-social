import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    isFetching: state.auth.isFetching
});

export const withAuthRedirect = (Component) => {
    class AuthRedirectComponent extends React.Component {

        render() {


            if(!this.props.isAuth) return <Redirect to={'/login'}/>;

            return <Component {...this.props}/>;
        }
    }

    return connect(mapStateToProps)(AuthRedirectComponent);
};