import {POST_LIST, POST_LIST_ADD} from "../actions/actions";

export default (state = {
    posts: null,
    anotherState: 'Hi '
}, action) => {
    switch (action.type) {
        case POST_LIST:
        return {
            ...state,
            posts: action.data
        };
        case POST_LIST_ADD:
        return {
            ...state,
            posts: state.posts ? state.posts.concat(action.data) : state.posts
        };
        default:
            return state;
    }
}
