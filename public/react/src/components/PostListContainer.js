import React from 'react';
import PostList from "./PostList";
import {postListFetch} from "../actions/actions";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state.postList
});

const mapDispatchToProps = {
    postListFetch
};

class PostListContainer extends React.Component
{
    componentDidMount() {
        this.props.postListFetch();
    }

    render() {
        return(<PostList posts={this.props.posts} isFetching={this.props.isFetching} />)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
