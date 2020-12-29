import { ProjectInfoActionTypes } from './project-info.types';

const INITIAL_STATE = {
    lead: null,
    error: {},
    loading: true,
    popupAdd: false,
    popupInfo: false,
};

const projectInfoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ProjectInfoActionTypes.TOGGLE_RESOURCE_ADD:
            return {
                ...state,
                popupAdd: !state.popupAdd,
            };
        case ProjectInfoActionTypes.TOGGLE_RESOURCE_INFO:
            return {
                ...state,
                popupInfo: !state.popupInfo,
            };
        case ProjectInfoActionTypes.LEAD_SUCCESS:
            return {
                ...state,
                lead: action.payload,
                loading: false,
            };
        case ProjectInfoActionTypes.LEAD_FAILURE:
            return {
                ...state,
                lead: null,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default projectInfoReducer;
