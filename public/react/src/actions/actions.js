import {requests} from "../agent";
import {
    COMMENT_LIST_ERROR, COMMENT_LIST_RECEIVED,
    COMMENT_LIST_REQUEST, COMMENT_LIST_UNLOAD,
    POST_ERROR,
    POST_LIST_ADD,
    POST_LIST_ERROR,
    POST_LIST_RECEIVED,
    POST_LIST_REQUEST, POST_RECEIVED,
    POST_REQUEST, POST_UNLOAD, USER_LOGIN_SUCCESS, USER_PROFILE_ERROR, USER_PROFILE_RECEIVED, USER_PROFILE_REQUEST
} from "./constants";
import {SubmissionError} from "redux-form";

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

export const postUnload = () => ({
    type: POST_UNLOAD
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

export const commentListRequest = () => ({
    type: COMMENT_LIST_REQUEST,
});

export const commentListError = (error) => ({
    type: COMMENT_LIST_ERROR,
    error
});

export const commentListReceived = (data) => ({
    type: COMMENT_LIST_RECEIVED,
    data
});

export const commentListUnload = () => ({
    type: COMMENT_LIST_UNLOAD
});

export const commentListFetch = (id) => {
    return (dispatch) => {
        dispatch(commentListRequest());
        return requests
            .get(`/posts/${id}/comments`)
            .then(response => dispatch(commentListReceived(response)))
            .catch(error => dispatch(commentListError(error)));
    }
};

export const userLoginSuccess = (token, userId) => {
  return {
    type: USER_LOGIN_SUCCESS,
    token,
    userId
  }
};

export const userLoginAttempt = (username, password) => {
    return(dispatch) => {
        return requests
            .post('/login_check', {username, password}, false)
            .then(response => dispatch(userLoginSuccess(response.token, response.id)))
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Username or password is invalid'
                })
            });
    }
};

export const userProfileRequest = () => {
    return {
        type: USER_PROFILE_REQUEST
    }
};

export const userProfileError = (userId) => {
    return {
        type: USER_PROFILE_ERROR,
        userId
    }
};

export const userProfileReceived = (userId, userData) => {
    return {
        type: USER_PROFILE_RECEIVED,
        userData,
        userId
    }
};

export const userProfileFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileRequest());
        return requests
            .get(`/users/${userId}`, true)
            .then(response => dispatch(userProfileReceived(userId, response)))
            .catch(() => dispatch(userProfileError(userId)))
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
