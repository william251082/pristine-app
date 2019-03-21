import React from 'react';
import {postFetch} from "../actions/actions";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state.post
});

const mapDispatchToProps = {
    postFetch
};

class PostContainer extends React.Component
{
    componentDidMount() {
        // console.log(this.props);
        // console.log(this.props.match.params.id);
        this.props.postFetch(this.props.match.params.id).then(_ => console.log(this.props.post));
    }

    render() {
        return (
            <div>
                Hello from Post!
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);
