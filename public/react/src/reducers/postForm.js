import {
    IMAGE_DELETED,
    IMAGE_UPLOAD_ERROR,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOADED,
    POST_FORM_UNLOAD
} from "../actions/constants";

export default (state = {
    isImageUploading: false,
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
                images: state.images.concat(action.image)
            };
        case IMAGE_UPLOAD_ERROR:
            return {
                ...state,
                isImageUploading: false
            };
        case POST_FORM_UNLOAD:
            return {
                ...state,
                isImageUploading: false,
                images: []
            };
        case IMAGE_DELETED:
            return {
                ...state,
                images: state.images.filter(image => image.id !== action.imageId),
                isImageUploading: false
            };
        default:
            return state;
    }
}
