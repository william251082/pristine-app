import React from 'react';
import LoginForm from "./LoginForm";
import {Route, Switch} from "react-router";
import PostList from "./PostList";

class App extends React.Component
{
    render() {
        return(
            <div>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/posts" component={PostList}/>
                </Switch>
            </div>
        )
    }
}

export default App;
