import { ProjectInfoActionTypes } from './project-info.types';

const INITIAL_STATE = {
    leadOrManager: null,
    resource: null,
    error: {},
    loading: true,
    popupAdd: false,
    popupInfo: false,
    editMode: false,
    messages: [],
    messagesLoading: true,
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
                resource: action.payload,
                messages: [],
                messagesLoading: true,
            };
        case ProjectInfoActionTypes.TOGGLE_EDIT_MODE:
            return {
                ...state,
                editMode: !state.editMode,
            };
        case ProjectInfoActionTypes.LEAD_OR_MANAGER_SUCCESS:
            return {
                ...state,
                leadOrManager: action.payload,
                loading: false,
            };
        case ProjectInfoActionTypes.LEAD_OR_MANAGER_FAILURE:
            return {
                ...state,
                leadOrManager: null,
                error: action.payload,
                loading: false,
            };
        case ProjectInfoActionTypes.GET_MESSAGES:
            return {
                ...state,
                messages: action.payload,
                messagesLoading: false,
            };
        case ProjectInfoActionTypes.MESSAGES_ERROR:
            return {
                ...state,
                messages: [],
                error: action.payload,
                messagesLoading: false,
            };
        case ProjectInfoActionTypes.CLEAR_INFO: //back to initial state
            return {
                ...state,
                leadOrManager: null,
                resource: null,
                loading: true,
                popupAdd: false,
                popupInfo: false,
                editMode: false,
                messages: [],
                messagesLoading: true,
            };
        default:
            return state;
    }
};

export default projectInfoReducer;
