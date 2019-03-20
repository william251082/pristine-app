import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import {Provider} from "react-redux";
import {createBrowserHistory} from 'history'
import App from "./components/App";
import Route from "react-router/es/Route";
import ConnectedRouter from "react-router-redux/es/ConnectedRouter";

const store = createStore(
    state => state
);
const history = createBrowserHistory();

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App}/>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
