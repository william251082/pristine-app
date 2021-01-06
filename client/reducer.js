import postList from "./reducers/postList";
import post from "./reducers/post";
import commentList from "./reducers/commentList";
import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import auth from "./reducers/auth";
import {routerReducer} from "react-router-redux";
import registration from "./reducers/registration";
import postForm from "./reducers/postForm";

export default combineReducers({
    postList,
    post,
    commentList,
    auth,
    registration,
    postForm,
    router: routerReducer,
    form: formReducer
});
