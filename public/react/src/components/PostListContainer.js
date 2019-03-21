import React from 'react';
import PostList from "./PostList";
import {postListFetch} from "../actions/actions";
import {connect} from "react-redux";
import {Spinner} from "./Spinner";

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
        const {isFetching} = this.props;

        if (isFetching) {
            return(<Spinner/>)
        }

        return(<PostList posts={this.props.posts}/>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
