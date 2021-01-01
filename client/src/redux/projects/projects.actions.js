import { ProjectsActionTypes } from './projects.types';
import { setAlert } from '../alert/alert.actions';
import { loadUser } from '../auth/auth.actions';

import axios from 'axios';

export const getAllProjects = (userType) => async (dispatch) => {
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
            dispatch(loadUser());
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
