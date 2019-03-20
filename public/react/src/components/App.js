import React from 'react';
import LoginForm from "./LoginForm";
import {Route, Switch} from "react-router";
import PostListContainer from "./PostListContainer";

class App extends React.Component
{
    render() {
        return(
            <div>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/posts" component={PostListContainer}/>
                </Switch>
            </div>
        )
    }
}

export default App;
