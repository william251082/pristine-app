import postList from "./reducers/postList";
import {combineReducers} from "redux";
import post from "./reducers/post";
import commentList from "./reducers/commentList";

export default combineReducers({
    postList,
    post,
    commentList
});
