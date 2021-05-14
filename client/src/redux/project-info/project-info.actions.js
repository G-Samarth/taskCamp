import axios from 'axios';
import { ProjectInfoActionTypes } from './project-info.types';

export const getLeadOrManager = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/auth/user/${userId}`);

        dispatch({
            type: ProjectInfoActionTypes.LEAD_OR_MANAGER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ProjectInfoActionTypes.LEAD_OR_MANAGER_FAILURE,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const getMessages = (userType, projectId, id) => async (dispatch) => {
    try {
        const end = userType === 'Lead' ? id : 'chat';
        const res = await axios.get(
            `/${userType}/projects/${projectId}/${end}`
        );

        dispatch({
            type: ProjectInfoActionTypes.GET_MESSAGES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ProjectInfoActionTypes.MESSAGES_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const sendMessage =
    (message, userType, projectId, id) => async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            await axios.post(
                `/${userType}/projects/${projectId}/${
                    userType === 'Lead' ? id : 'chat'
                }`,
                message,
                config
            );

            const res = await axios.get(
                `/${userType}/projects/${projectId}/${
                    userType === 'Lead' ? id : 'chat'
                }`
            );

            dispatch({
                type: ProjectInfoActionTypes.GET_MESSAGES,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: ProjectInfoActionTypes.MESSAGES_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status,
                },
            });
        }
    };

export const toggleResourceAdd = () => (dispatch) => {
    dispatch({
        type: ProjectInfoActionTypes.TOGGLE_RESOURCE_ADD,
    });
};

export const toggleResourceInfo = (props) => (dispatch) => {
    dispatch({
        type: ProjectInfoActionTypes.TOGGLE_RESOURCE_INFO,
        payload: props,
    });
};

export const toggleEditMode = () => (dispatch) => {
    dispatch({
        type: ProjectInfoActionTypes.TOGGLE_EDIT_MODE,
    });
};
