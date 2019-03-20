import React from 'react';
import PostList from "./PostList";
import {postAdd, postListFetch} from "../actions/actions";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state.postList
});

const mapDispatchToProps = {
    postAdd,
    postListFetch
};

class PostListContainer extends React.Component
{
    componentDidMount() {
        setTimeout(this.props.postAdd, 3000);
        setTimeout(this.props.postAdd, 5000);
        setTimeout(this.props.postAdd, 7000);
        this.props.postListFetch();
    }

    render() {
        return(<PostList posts={this.props.posts} />)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
