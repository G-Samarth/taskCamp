import { ProjectInfoActionTypes } from './project-info.types';

const INITIAL_STATE = {
    lead: null,
    resources: [],
    error: {},
    loading: true,
};

const projectInfoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProjectInfoActionTypes.LEAD_SUCCESS:
            return {
                ...state,
                lead: action.payload,
                loading: false,
            };
        case ProjectInfoActionTypes.RESOURCE_SUCCESS:
            return {
                ...state,
                resources: action.payload,
                loading: false,
            };
        case ProjectInfoActionTypes.LEAD_FAILURE:
            return {
                ...state,
                lead: null,
                error: action.payload,
                loading: false,
            };
        case ProjectInfoActionTypes.RESOURCE_FAILURE:
            return {
                ...state,
                resources: [],
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default projectInfoReducer;
