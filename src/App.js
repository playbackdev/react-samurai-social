import React from 'react';
import './App.scss';
import Header from "./components/Header/Header";
import {Route} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";




const App = () => {
    return (
            <div className="app-wrapper">
                <Header/>
                <div className="app-container">
                    <div className="app-content">
                    <Route path='/profile' render={ () => <ProfileContainer/>}/>
                    <Route path='/dialogs' render={ () => <DialogsContainer/>}/>
                    <Route path='/users' component={UsersContainer}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                    </div>
                </div>
            </div>
    );
};

export default App;
