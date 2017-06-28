import { loadingStart, loadingEnd } from './loadingActions';
import { showModal } from './modalActions';

const BASE_URL = 'https://lietuvago-maxleaf.c9users.io/';

function fetchReq(url, request, successCallback=defaultSuccessCallback, errorCallback=defaultErrorCallback) {
    return (dispatch, getState) => {
        fetch(url, request)
        .then((response) => {
            dispatch(loadingEnd());
            if (response.status >= 400) {
                dispatch(errorCallback(response.status));
            } else {
                try {
                    return response.json();
                } catch(e) { showModal(e); }
            }
        })
        .then((data) => {
            if (data) {
                if (data.success === undefined || data.success) {
                    dispatch(successCallback(data));
                } else {
                    dispatch(errorCallback(data.message));
                }
            }
        });
    }
}

function apiReq(method, url, body, successCallback, errorCallback) {
    return (dispatch, getState) => {
        const state = getState();
        const { token } = state.session.user;

        const req = {
            method: method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-access-token': token
            }
        };
        if (method !== 'get') {
            req.body = JSON.stringify(body);
        }

        dispatch(fetchReq(BASE_URL+'api/'+url, req, successCallback, errorCallback));
    }
}

function noTokenReq(method, url, body, successCallback, errorCallback) {
    const req = {
        method: method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };
    if (method !== 'get') {
        req.body = JSON.stringify(body);
    }
    return fetchReq(BASE_URL+url, req, successCallback, errorCallback);
}

function defaultErrorCallback(message) {
    return showModal('Error! '+ message);
}
function defaultSuccessCallback() {
    // do nothing
    // return showNotification('Done!', 'success');
}

// fetch(url, {
//   credentials: 'include', //pass cookies, for authentication
//   method: 'post',
//   headers: {
//   'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
//   },
//   body: form
// });


module.exports = {
    fetchReq,
    defaultErrorCallback,
    defaultSuccessCallback,
    apiReq,
    noTokenReq
};