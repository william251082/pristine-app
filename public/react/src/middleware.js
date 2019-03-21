import {USER_LOGIN_SUCCESS} from "./actions/constants";
import {requests} from "./agent";

export const tokenMiddleware = store => next => action => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            window.locationStorage.setItem('jwtToken', action.token);
            window.locationStorage.setItem('userId', action.userId);
            requests.setToken(action.token);
            break;
        default:

    }

    next(action);
};
