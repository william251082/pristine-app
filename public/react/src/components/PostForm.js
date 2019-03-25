import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {canWritePost} from "../apiUtils";
import {Redirect} from "react-router";

const mapDispatchToProps = {

};

const mapStateToProps = state => ({
    userData: state.auth.userData
});

class PostForm extends React.Component
{
    render() {
        if (!canWritePost(this.props.userData)) {
            return <Redirect to={"/login"}/>
        }
        return (<div>Create a new post</div>)
    }
}

export default reduxForm({
    form: 'PostForm'
})(connect(mapStateToProps, mapDispatchToProps)(PostForm))
