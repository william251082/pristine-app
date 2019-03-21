import React from 'react';

export default class PostContainer extends React.Component
{
    componentDidMount() {
        console.log(this.props);
        console.log(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                Hello from Post!
            </div>
        )
    }
}
