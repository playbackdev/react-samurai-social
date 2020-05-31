import React, {Component} from 'react';
import './App.scss';
import HeaderContainer from "./components/Header/HeaderContainer";
import {Route} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./redux/AppReducer";
import AppPreloader from "./components/UI/Preloader/AppPreloader";

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
                        {/*Знак ? в конце пути означает, что параметр опциональный,
                        роут будет работать и без него*/}
                        <Route exact path='/profile/' render={() => <ProfileContainer/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/users' component={UsersContainer}/>
                        <Route path='/news' component={News}/>
                        <Route path='/music' component={Music}/>
                        <Route path='/settings' component={Settings}/>
                        <Route path='/login' component={Login}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        initialized: state.appState.initialized,
    }
};

const mapDispatchToProps = {
    initializeApp
};

//если роутинг не работает, то обернуть еще в withRouter()
export default connect(mapStateToProps, mapDispatchToProps)(App);
