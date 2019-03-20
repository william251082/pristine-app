import {requests} from "../agent";

export const POST_LIST_REQUEST = 'POST_LIST_REQUEST';
export const POST_LIST_RECEIVED = 'POST_LIST_RECEIVED';
export const POST_LIST_ERROR = 'POST_LIST_ERROR';
export const POST_LIST_ADD = 'POST_LIST_ADD';

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

export const postAdd = () => ({
    type: POST_LIST_ADD,
    data: [
        {
            id: Math.floor(Math.random() * 100 + 3),
            title: 'A newly added blog post'
        }
    ]
});
