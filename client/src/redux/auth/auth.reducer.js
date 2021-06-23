import { AuthActionTypes } from './auth.types';

const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    currentUser: null,
    uploadPopup: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthActionTypes.TOGGLE_PROFILE_IMAGE:
            return {
                ...state,
                uploadPopup: !state.uploadPopup,
            };
        case AuthActionTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                currentUser: action.payload,
            };
        case AuthActionTypes.REGISTER_SUCCESS:
        case AuthActionTypes.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: true, //check
            };
        case AuthActionTypes.REGISTER_FAILURE:
        case AuthActionTypes.LOGIN_FAILURE:
        case AuthActionTypes.AUTH_ERROR:
        case AuthActionTypes.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                currentUser: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
};

export default authReducer;
