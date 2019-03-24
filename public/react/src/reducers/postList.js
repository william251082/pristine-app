import {
    POST_LIST_REQUEST,
    POST_LIST_ADD,
    POST_LIST_RECEIVED,
    POST_LIST_ERROR,
    POST_LIST_SET_PAGE
} from "../actions/constants";

export default (state = {
    posts: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type) {
        case POST_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true,
                posts: action.data
            };
            return state;
        case POST_LIST_RECEIVED:
            state = {
                ...state,
                posts: action.data['hydra:member'],
                isFetching: false
            };
            return state;
        case POST_LIST_ERROR:
            state = {
                ...state,
                isFetching: false,
                posts: null
            };
            return state;
        case POST_LIST_ADD:
            state = {
                ...state,
                posts: state.posts ? state.posts.concat(action.data) : state.posts
            };
            return state;
        case POST_LIST_SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            };
        default:
            return state;
    }
}
