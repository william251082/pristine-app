import postList from "./reducers/postList";
import post from "./reducers/post";
import commentList from "./reducers/commentList";
import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import auth from "./reducers/auth";

export default combineReducers({
    postList,
    post,
    commentList,
    auth,
    form: formReducer
});
