import React from 'react';
import LoginForm from "./LoginForm";
import {Route, Switch} from "react-router";
import PostListContainer from "./PostListContainer";
import Header from "./Header";
import PostContainer from "./PostContainer";
import {requests} from "../agent";
import {connect} from "react-redux";
import {userLogout, userProfileFetch, userSetId} from "../actions/actions";

const mapStateToProps = state => ({
    ...state.auth
});

const mapDispatchToProps = {
    userProfileFetch, userSetId, userLogout
};

class App extends React.Component
{
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');

        if (token) {
            requests.setToken(token);
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const {userSetId} = this.props;

        if (userId) {
            userSetId(userId);
        }
    }

    componentDidUpdate(prevProps) {
        const {userId, userData, userProfileFetch} = this.props;

        if (prevProps.userId !== userId && userId !== null && userData === null) {
            userProfileFetch(userId);
        }
    }

    render() {
        const {isAuthenticated, userData, userLogout} = this.props;

        return(
            <div>
                <Header isAuthenticated={isAuthenticated} userData={userData} logout={userLogout}/>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/post/:id" component={PostContainer}/>
                    <Route path="/" component={PostListContainer}/>
                </Switch>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
