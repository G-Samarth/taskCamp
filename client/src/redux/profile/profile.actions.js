import { ProfileActionTypes } from './profile.types';
import axios from 'axios';

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/manager/projects');

        dispatch({
            type: ProfileActionTypes.GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ProfileActionTypes.PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};
