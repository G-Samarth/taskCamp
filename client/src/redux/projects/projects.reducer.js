import { ProjectsActionTypes } from './projects.types';

const INITIAL_STATE = {
    project: null,
    projects: [],
    loading: true,
    error: {},
};

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProjectsActionTypes.GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false,
            };
        case ProjectsActionTypes.GET_PROJECT:
            return {
                ...state,
                project: action.payload,
                loading: false,
            };
        case ProjectsActionTypes.PROJECT_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case ProjectsActionTypes.CLEAR_PROJECTS:
            return {
                ...state,
                projects: [],
                loading: false,
            };
        default:
            return state;
    }
};

export default profileReducer;
