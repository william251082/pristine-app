import {POST_LIST_REQUEST, POST_LIST_ADD, POST_LIST_RECEIVED, POST_LIST_ERROR} from "../actions/constants";

export default (state = {
    posts: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case POST_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true,
                posts: action.data
            };
            console.log(state);
            return state;
        case POST_LIST_RECEIVED:
            state = {
                ...state,
                posts: action.data['hydra:member'],
                isFetching: false
            };
            console.log(state);
            return state;
        case POST_LIST_ERROR:
            state = {
                ...state,
                isFetching: false,
                posts: null
            };
            console.log(state);
            return state;
        case POST_LIST_ADD:
            state = {
                ...state,
                posts: state.posts ? state.posts.concat(action.data) : state.posts
            };
            console.log(state);
            return state;
        default:
            return state;
    }
}
