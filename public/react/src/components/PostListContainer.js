import React from 'react';
import PostList from "./PostList";
import {postListFetch} from "../actions/actions";
import {connect} from "react-redux";
import {Spinner} from "./Spinner";
import {Paginator} from "./Paginator";

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

        return (
            <div>
                <PostList posts={this.props.posts}/>
                <Paginator currentPage={4} pageCount={5}/>
            </div>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
