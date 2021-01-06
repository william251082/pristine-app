import React from 'react';
import {commentListFetch, commentListUnload} from "../actions/actions";
import {connect} from "react-redux";
import {Spinner} from "./Spinner";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import {LoadMore} from "./LoadMore";

const mapStateToProps = state => ({
    ...state.commentList,
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
    commentListFetch,
    commentListUnload
};

class CommentListContainer extends React.Component
{
    componentDidMount() {
        this.props.commentListFetch(this.props.postId);
    }

    componentWillUnmount() {
        this.props.commentListUnload();
    }

    onLoadMoreClick() {
        const {postId, currentPage, commentListFetch} = this.props;

        commentListFetch(postId, currentPage);
    }

    render() {
        const {commentList, isFetching, isAuthenticated, postId, currentPage, pageCount} = this.props;
        const showLoadMore = pageCount > 1 && currentPage <= pageCount;
        console.log(commentList);

        if (isFetching && currentPage === 1) {
            return(<Spinner/>);
        }

        return (
            <div>
                <CommentList commentList={commentList}/>
                {showLoadMore && <LoadMore label="Load more comments..."
                                            onClick={this.onLoadMoreClick.bind(this)}
                                            disabled={isFetching}/>}
                {isAuthenticated && <CommentForm postId={postId}/>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);
