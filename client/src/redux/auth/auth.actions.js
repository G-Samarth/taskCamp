import axios from 'axios';
import { AuthActionTypes } from './auth.types';
import { ProjectsActionTypes } from '../projects/projects.types';
import { setAlert } from '../alert/alert.actions';
import { setAuthToken } from './auth.utils';

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('./auth/user');

        dispatch({
            type: AuthActionTypes.USER_LOADED,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: AuthActionTypes.AUTH_ERROR,
        });
    }
};

export const register = ({ name, email, password, userType }) => async (
    dispatch
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ name, email, userType, password });

    try {
        const res = await axios.post('/auth/register', body, config);

        dispatch({
            type: AuthActionTypes.REGISTER_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: AuthActionTypes.REGISTER_FAILURE,
        });
    }
};

export const login = ({ email, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/auth/login', body, config);

        dispatch({
            type: AuthActionTypes.LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: AuthActionTypes.LOGIN_FAILURE,
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: ProjectsActionTypes.CLEAR_PROJECTS,
    });
    dispatch({
        type: AuthActionTypes.LOGOUT,
    });
};
