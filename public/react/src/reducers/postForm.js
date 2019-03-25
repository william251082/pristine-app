import {IMAGE_UPLOAD_ERROR, IMAGE_UPLOAD_REQUEST, IMAGE_UPLOADED} from "../actions/constants";

export default (state = {
    isImageUploading: false,
    image: null,
    images: []
}, action) => {
    switch (action.type) {
        case IMAGE_UPLOAD_REQUEST:
            return {
                ...state,
                isImageUploading: true
            };
        case IMAGE_UPLOADED:
            return {
                ...state,
                isImageUploading: false,
                image: action.image,
                images: state.images.concat(action.image)
            };
        case IMAGE_UPLOAD_ERROR:
            return {
                ...state,
                isImageUploading: false
            };
        default:
            return state;
    }
}
