import postList from "./reducers/postList";
import post from "./reducers/post";
import commentList from "./reducers/commentList";
import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";

export default combineReducers({
    postList,
    post,
    commentList,
    form: formReducer
});
