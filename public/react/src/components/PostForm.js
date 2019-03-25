import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {canWritePost} from "../apiUtils";
import {Redirect} from "react-router";
import {renderField} from "../form";
import {postAdd} from "../actions/actions";
import ImageUpload from "./ImageUpload";
import {ImageBrowser} from "./ImageBrowser";

const mapDispatchToProps = {
    postAdd
};

const mapStateToProps = state => ({
    userData: state.auth.userData,
        ...state.postForm
});

class PostForm extends React.Component
{
    onSubmit(values) {
        const {postAdd, reset, history} = this.props;

        return postAdd(values.title, values.content)
            .then(() => {
                reset();
                history.push('/');
            });
    }

    render() {
        if (!canWritePost(this.props.userData)) {
            return <Redirect to={"/login"}/>
        }

        const {submitting, handleSubmit, error, images} = this.props;

        return (
            <div className="card mt-3 mb-6 shadow-sm">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field name="title" label="Title:" type="text" component={renderField}/>
                        <Field name="content" label="Content:" type="textarea" component={renderField}/>

                        <ImageUpload/>
                        <ImageBrowser images={images}/>

                        <button type="submit"
                                className="btn btn-primary btn-big btn-block"
                                disabled={submitting}>
                            Publish Now!
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'PostForm'
})(connect(mapStateToProps, mapDispatchToProps)(PostForm))