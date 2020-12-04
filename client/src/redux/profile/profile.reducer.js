import { ProfileActionTypes } from './profile.types';

const INITIAL_STATE = {
    profile: null,
    loading: true,
    error: {},
};

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProfileActionTypes.GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
            };
        case ProfileActionTypes.PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case ProfileActionTypes.CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
            };
        default:
            return state;
    }
};

export default profileReducer;
