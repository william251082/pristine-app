import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from "redux";
import createHistory from "history/createBrowserHistory";
import {Provider} from "react-redux";
import App from "./components/App";
import Route from "react-router/es/Route";
import ConnectedRouter from "react-router-redux/es/ConnectedRouter";
import LoginForm from "./components/LoginForm";
import Switch from "react-router/es/Switch";

const store = createStore(
    state => state
);
const history = createHistory();

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/login" component={LoginForm}/>
                <Route path="/" component={App}/>
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
