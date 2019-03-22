import React from 'react';
import {Link} from "react-router-dom";
import {Spinner} from "./Spinner";

export default class Header extends React.Component
{
    renderUser() {
        const {userData} = this.props;

        if (null === userData) {
            return(<Spinner/>)
        }

        return (<span>Hello {userData.name}</span>);
    }

    render() {
        const {isAuthenticated} = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">
                React Blog
                </Link>
                <span className="navbar-text">
                    {isAuthenticated ? this.renderUser() : <Link to="/login">Sign In</Link>}
                </span>
            </nav>
        )
    }
}
