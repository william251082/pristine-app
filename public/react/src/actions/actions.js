import {requests} from "../agent";
import {
    POST_ERROR,
    POST_LIST_ADD,
    POST_LIST_ERROR,
    POST_LIST_RECEIVED,
    POST_LIST_REQUEST, POST_RECEIVED,
    POST_REQUEST
} from "./constants";

export const postListRequest = () => ({
    type: POST_LIST_REQUEST,
});

export const postListError = (error) => ({
    type: POST_LIST_ERROR,
    error
});

export const postListReceived = (data) => ({
    type: POST_LIST_RECEIVED,
    data
});

export const postListFetch = () => {
  return (dispatch) => {
      dispatch(postListRequest());
      return requests
          .get('/posts')
          .then(response => dispatch(postListReceived(response)))
          .catch(error => dispatch(postListError(error)));
  }
};

export const postRequest = () => ({
    type: POST_REQUEST,
});

export const postError = (error) => ({
    type: POST_ERROR,
    error
});

export const postReceived = (data) => ({
    type: POST_RECEIVED,
    data
});

export const postFetch = (id) => {
    return (dispatch) => {
        dispatch(postRequest());
        return requests
            .get(`/posts/${id}`)
            .then(response => dispatch(postReceived(response)))
            .catch(error => dispatch(postError(error)));
    }
};

export const postAdd = () => ({
    type: POST_LIST_ADD,
    data: [
        {
            id: Math.floor(Math.random() * 100 + 3),
            title: 'A newly added blog post'
        }
    ]
});
