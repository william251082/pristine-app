import React from 'react';
import PostList from "./PostList";

class PostListContainer extends React.Component
{
    constructor(props) {
    super(props);
        console.log(props);
    this.posts = [
            {
                id: 1,
                title: 'Hello'
            },
            {
                id: 2,
                title: 'Hello2'
            }
        ];
    }

    render() {
        return(<PostList posts={this.posts} />)
    }
}

export default PostListContainer;
