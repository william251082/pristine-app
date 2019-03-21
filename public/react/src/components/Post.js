import React from 'react';
import timeago from 'timeago.js';
import {Spinner} from "./Spinner";
import {Message} from "./Message";

export class Post extends React.Component {
    render() {
        const {post, isFetching} = this.props;

        if (isFetching) {
            return (<Spinner/>);
        }

        if (null === post) {
            return (<Message message="Post does not exist"/>);
        }

        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    <h2>{post.title}</h2>
                    <p className="card-text">{post.content}</p>
                    <p className="card-text border-top">
                        <small className="text-muted">
                            {timeago().format(post.published)} by&nbsp;
                            {post.author.name}
                        </small>
                    </p>
                </div>
            </div>
        )
    }
}
