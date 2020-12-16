import axios from 'axios';
import { ProjectInfoActionTypes } from './project-info.types';

export const getLead = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/auth/user/${userId}`);

        dispatch({
            type: ProjectInfoActionTypes.LEAD_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ProjectInfoActionTypes.LEAD_FAILURE,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
