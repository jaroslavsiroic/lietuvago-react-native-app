import { noTokenReq, apiReq } from './fetchActions';
import { loadingStart } from './loadingActions';
import { showModal } from './modalActions';
// (method, url, body, successCallback, errorCallback)

function userRegister(data) {
    return (dispatch) => {
        dispatch(loadingStart(data.username + ' register in progress'));
        dispatch(noTokenReq('post', 'reg', data, userRegisterSuccess));
    }
}

function userRegisterSuccess() {
    return (dispatch) => {
        dispatch(showModal('Registration complete!'));
    }
}

function userLogin(data) {
    return (dispatch) => {
        dispatch(loadingStart(data.username + ' login in progress'));
        dispatch(noTokenReq('post', 'auth', data, userLoginSuccess));
    }
}

function userLoginSuccess(data) {
    return {
        type: 'USER_LOGIN',
        payload: data
    };
}

function userLogout() {
    return {
        type: 'USER_LOGOUT'
    };
}

module.exports = {
    userRegister,
    userLogin,
    userLogout,
}