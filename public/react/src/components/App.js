import React from 'react';
import LoginForm from "./LoginForm";
import {Route, Switch} from "react-router";
import PostListContainer from "./PostListContainer";
import Header from "./Header";

class App extends React.Component
{
    render() {
        return(
            <div>
                <Header/>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/" component={PostListContainer}/>
                </Switch>
            </div>
        )
    }
}

export default App;
