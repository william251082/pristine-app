import React from 'react';
import PostList from "./PostList";
import {postAdd, postList} from "../actions/actions";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state.postList
});

const mapDispatchToProps = {
    postList,
    postAdd
};

class PostListContainer extends React.Component
{
    componentDidMount() {
        setTimeout(this.props.postAdd, 1000);
        setTimeout(this.props.postAdd, 3000);
        setTimeout(this.props.postAdd, 5000);
        this.props.postList();
    }

    render() {
        console.log(this.props.posts);
        return(<PostList posts={this.props.posts} />)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
