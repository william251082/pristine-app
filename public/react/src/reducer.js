import postList from "./reducers/postList";
import {combineReducers} from "redux";
import post from "./reducers/post";

export default combineReducers({
    postList,
    post
});