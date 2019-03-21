import React from 'react';
import {reduxForm} from "redux-form";

class LoginForm extends React.Component
{
    render() {
        console.log(this.props);
        return(<div>Hello From Login Form!</div>)
    }
}

export default reduxForm({
        form: 'LoginForm'
    })(LoginForm);
