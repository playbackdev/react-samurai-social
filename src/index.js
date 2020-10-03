import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from './redux/reduxStore';
import {BrowserRouter, HashRouter} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";


ReactDOM.render(
        /*HashRouter only for gh-pages. Use BrowserRouter! */
        <HashRouter
            /*basename={process.env.PUBLIC_URL}*/
        >
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>,
    document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();