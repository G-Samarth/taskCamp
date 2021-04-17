import { v4 as uuidv4 } from 'uuid';
import { AlertActionTypes } from './alert.types';

export const setAlert = (msg, alertType, wide = true) => (dispatch) => {
    const id = uuidv4();

    dispatch({
        type: AlertActionTypes.SET_ALERT,
        payload: { msg, alertType, id, wide },
    });

    setTimeout(
        () =>
            dispatch({
                type: AlertActionTypes.REMOVE_ALERT,
                payload: id,
            }),
        5000
    );
};
