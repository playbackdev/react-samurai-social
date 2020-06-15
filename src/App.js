import React, {Component, Suspense, lazy} from 'react';
import './App.scss';
import {Redirect, Route, Switch} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/AppReducer";
import AppPreloader from "./components/UI/Preloader/AppPreloader";

import HeaderContainer from "./components/Header/HeaderContainer";
import {Popup} from "./components/UI/Popup/Popup";
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));

class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) {
            return <AppPreloader/>;
        }
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <div className="app-container">
                    <div className="app-content">
                        <Suspense fallback={<AppPreloader/>}>
                            <Switch>
                                {/*Знак ? в конце пути означает, что параметр опциональный,
                                роут будет работать и без него*/}
                                <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                                <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                                <Route path='/users' component={UsersContainer}/>
                                <Route path='/news' component={News}/>
                                <Route path='/music' component={Music}/>
                                <Route path='/settings' component={Settings}/>
                                <Route path='/login' component={Login}/>
                                <Redirect exact from="/" to="/profile"/>
                                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
                            </Switch>
                            {this.props.error && <Popup message={this.props.error} className={"error"}/>}
                        </Suspense>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        initialized: state.appState.initialized,
        error: state.userErrors.error
    }
};

const mapDispatchToProps = {
    initializeApp
};

//если роутинг не работает, то обернуть еще в withRouter()
export default connect(mapStateToProps, mapDispatchToProps)(App);
