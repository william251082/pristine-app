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
        this.props.postListFetch(this.getQueryParamPage());
    }

    componentDidUpdate(prevProps) {
        const {currentPage, postListFetch, postListSetPage} = this.props;

        if (prevProps.match.params.page !== this.getQueryParamPage()) {
            postListSetPage(this.getQueryParamPage());
        }

        if (prevProps.currentPage !== currentPage) {
            postListFetch(currentPage);
        }
    }

    getQueryParamPage() {
        return Number(this.props.match.params.page) || 1;
    }

    changePage(page) {
        const {history, postListSetPage} = this.props;
        postListSetPage(page);
        history.push(`/${page}`);
    }

    render() {
        const {posts, isFetching, currentPage} = this.props;

        if (isFetching) {
            return(<Spinner/>)
        }

        return (
            <div>
                <PostList posts={posts}/>
                <Paginator currentPage={currentPage} pageCount={5} setPage={this.changePage.bind(this)} />
            </div>
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer);
