import React from 'react';
import PostList from "./PostList";
import {postListFetch, postListSetPage} from "../actions/actions";
import {connect} from "react-redux";
import {Spinner} from "./Spinner";
import {Paginator} from "./Paginator";

const mapStateToProps = state => ({
    ...state.postList
});

const mapDispatchToProps = {
    postListFetch, postListSetPage
};

class PostListContainer extends React.Component
{
    componentDidMount() {
        this.props.postListFetch();
    }

    componentDidUpdate(prevProps) {
        const {currentPage, postListFetch} = this.props;

        if (prevProps.currentPage !== currentPage) {
            postListFetch(currentPage);
        }
    }


    render() {
        const {posts, isFetching, postListSetPage, currentPage} = this.props;

        if (isFetching) {
            return(<Spinner/>)
        }

        return (
            <div>
                <PostList posts={posts}/>
                <Paginator currentPage={currentPage} pageCount={5} setPage={postListSetPage}/>
            </div>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
