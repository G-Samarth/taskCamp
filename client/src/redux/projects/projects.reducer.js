import { ProjectsActionTypes } from './projects.types';

import { filterResource } from './projects.utils';

const INITIAL_STATE = {
    project: null,
    projects: [],
    loading: true,
    error: {},
};

const projectsReducer = (state = INITIAL_STATE, action) => {
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
        case ProjectsActionTypes.DELETE_PROJECT:
            return {
                ...state,
                project: null,
                projects: state.projects.filter(
                    (project) => project._id !== action.payload
                ),
                loading: false,
            };
        case ProjectsActionTypes.DELETE_RESOURCE:
            return {
                ...state,
                project: filterResource(state.project, action.payload),
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
                project: null,
                projects: [],
                loading: false,
            };
        default:
            return state;
    }
};

export default projectsReducer;
