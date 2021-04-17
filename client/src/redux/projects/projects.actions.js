import { ProjectsActionTypes } from './projects.types';
import { ProjectInfoActionTypes } from '../project-info/project-info.types';
import { setAlert } from '../alert/alert.actions';

import axios from 'axios';
import { toggleResourceAdd } from '../project-info/project-info.actions';

export const getAllProjects = (userType) => async (dispatch) => {
    dispatch({
        type: ProjectInfoActionTypes.CLEAR_INFO,
    });
    try {
        const res = await axios.get(`/${userType}/projects`);

        dispatch({
            type: ProjectsActionTypes.GET_PROJECTS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ProjectsActionTypes.PROJECT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const getProjectById = (projectId, userType) => async (dispatch) => {
    try {
        const res = await axios.get(`/${userType}/projects/${projectId}`);

        dispatch({
            type: ProjectsActionTypes.GET_PROJECT,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ProjectsActionTypes.PROJECT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const deleteProject = (projectId, userType, history) => async (
    dispatch
) => {
    try {
        await axios.delete(`/${userType}/projects/${projectId}`);

        dispatch({
            type: ProjectsActionTypes.DELETE_PROJECT,
            payload: projectId,
        });
        dispatch(setAlert('Project Deleted', 'success'));
        history.push('/dashboard');
    } catch (err) {
        dispatch({
            type: ProjectsActionTypes.PROJECT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const createProject = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        await axios.post('/manager/projects', formData, config);

        const res = await axios.get('/manager/projects');

        dispatch({
            type: ProjectsActionTypes.GET_PROJECTS,
            payload: res.data,
        });

        dispatch(
            setAlert(edit ? 'Project Updated' : 'Project Created', 'success')
        );

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ProjectsActionTypes.PROJECT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

export const addResource = (formData, projectId) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        await axios.post(`/lead/projects/${projectId}`, formData, config);

        const res = await axios.get(`/lead/projects/${projectId}`);

        dispatch(toggleResourceAdd());

        dispatch({
            type: ProjectsActionTypes.GET_PROJECT,
            payload: res.data,
        });

        dispatch(setAlert('New Resource Added', 'success', false));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) =>
                dispatch(setAlert(error.msg, 'danger', false))
            );
        }

        dispatch(toggleResourceAdd());

        dispatch({
            type: ProjectsActionTypes.PROJECT_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
