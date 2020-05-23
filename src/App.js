import React from 'react';
import './App.scss';
import HeaderContainer from "./components/Header/HeaderContainer";
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
                <HeaderContainer/>
                <div className="app-container">
                    <div className="app-content">
                        {/*Знак ? в конце пути означает, что параметр опциональный,
                        роут будет работать и без него*/}
                    <Route path='/profile/:userId?' render={ () => <ProfileContainer/>}/>
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
