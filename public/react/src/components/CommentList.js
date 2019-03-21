import React from 'react';
import {Message} from "./Message";

class CommentList extends React.Component
{
    render() {
        const {commentList} = this.props;
        console.log(commentList);

        if (null === commentList) {
            return (<Message message="No Comments Yet"/>);
        }

        return (
            <div className="card mb-3 mt-3 shadow-sm">
                Not Done Yet...
            </div>
        )
    }
}

export default CommentList;
