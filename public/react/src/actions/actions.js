import {requests} from "../agent";
import {
    COMMENT_ADDED,
    COMMENT_LIST_ERROR,
    COMMENT_LIST_RECEIVED,
    COMMENT_LIST_REQUEST,
    COMMENT_LIST_UNLOAD,
    POST_ERROR,
    POST_LIST_ERROR,
    POST_LIST_RECEIVED,
    POST_LIST_REQUEST, POST_LIST_SET_PAGE,
    POST_RECEIVED,
    POST_REQUEST,
    POST_UNLOAD, USER_CONFIRMATION_SUCCESS,
    USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_PROFILE_ERROR,
    USER_PROFILE_RECEIVED,
    USER_PROFILE_REQUEST, USER_REGISTER_COMPLETE, USER_REGISTER_SUCCESS,
    USER_SET_ID
} from "./constants";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "../apiUtils";

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

export const postListSetPage = (page) => ({
    type: POST_LIST_SET_PAGE,
    page
});

export const postListFetch = (page = 1) => {
  return (dispatch) => {
      dispatch(postListRequest());
      return requests
          .get(`/posts?_page=${page}`)
          .then(response => dispatch(postListReceived(response)))
          .catch(error => dispatch(postListError(error)));
  }
};

export const postAdd = (title, content) => {
    return (dispatch) => {
        return requests
            .post('/posts', {
                title,
                content,
                slug: title && title.replace(/ /g, "-").toLowerCase()
            })
            .catch((error) => {
                if (401 === error.response.status) {
                    return dispatch(userLogout());
                } else if (403 === error.response.status) {
                    throw new SubmissionError({
                        _error: 'You do not have rights to publish posts!'
                    });
                }
                throw new SubmissionError(parseApiErrors(error));
            })
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

export const commentListFetch = (id, page = 1) => {
    return (dispatch) => {
        dispatch(commentListRequest());
        return requests
            .get(`/posts/${id}/comments?_page=${page}`)
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
    return (dispatch) => {
        return requests
            .post('/login_check', {username, password}, false)
            .then(response => dispatch(userLoginSuccess(response.token, response.id)))
            .catch(() => {
                throw new SubmissionError({
                    _error: 'Username or password is invalid'
                })
            });
    }
};

export const userLogout = () => {
  return {
      type: USER_LOGOUT
  }
};

export const userRegisterSuccess = () => {
    return {
        type: USER_REGISTER_SUCCESS
    }
};

export const userRegister = (username, password, retypedPassword, email, name) => {
    return (dispatch) => {
        return requests
            .post('/users', {username, password, retypedPassword, email, name}, false)
            .then(() => dispatch(userRegisterSuccess()))
            .catch(error => {
                throw new SubmissionError(parseApiErrors(error))
            });
    }
};

export const userConfirmationSuccess = () => {
    return {
        type: USER_CONFIRMATION_SUCCESS
    }
};

export const userRegisterComplete = () => {
    return {
        type: USER_REGISTER_COMPLETE
    }
};

export const userConfirm = (confirmationToken) => {
    return (dispatch) => {
        return requests
            .post('/users/confirm', {confirmationToken}, false)
            .then(() => dispatch(userConfirmationSuccess()))
            .catch(error => {
                throw new SubmissionError({
                    _error: 'Confirmation token is invalid.'
                })
            });
    }
};

export const commentAdded = (comment) => ({
    type: COMMENT_ADDED,
    comment
});

export const commentAdd = (comment, postId) => {
    return (dispatch) => {
        return requests
            .post('/comments', {content: comment, post: `/api/posts/${postId}`})
            .then(response => dispatch(commentAdded(response)))
            .catch(error => {
                if (401 === error.response.status) {
                    dispatch(userLogout());
                }
                throw new SubmissionError({content: 'This is an error.'})
            })
    }
};

export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId
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

