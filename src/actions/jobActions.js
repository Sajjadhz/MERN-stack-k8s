import socket from '../utils/webSocket.js'

import {
    GET_ERRORS,
} from "./types";

export const addNewJob = (jobData, history) => dispatch => {
    socket.emit('newJob', jobData);

    socket.on('err', err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
    });

    socket.on('job_add_success', () => history.push('/jobs'));
};