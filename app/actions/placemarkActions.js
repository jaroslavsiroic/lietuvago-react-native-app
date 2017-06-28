import { apiReq } from './fetchActions';
import { loadingStart } from './loadingActions';
import { showModal } from './modalActions';
// (method, url, body, successCallback, errorCallback)

function getPlacemarks() {
    return (dispatch) => {
        dispatch(loadingStart('Placemarks loading'));
        dispatch(apiReq('get', 'placemarks', {}, receivePlacemarks));
    }
}

function getPlacemarkById(id) {
    return apiReq('get', 'placemarks?id='+id, {}, receivePlacemarkById);
}

function getMyPlacemarks() {
    return (dispatch) => {
        dispatch(loadingStart('Your Placemarks loading'));
        dispatch(apiReq('get', 'users/myplacemarks', {}, receiveMyPlacemarks));
    }
}

function receiveMyPlacemarks(data) {
    return {
        type: 'RECEIVE_MY_PLACEMARKS',
        payload: data
    };
}

function receivePlacemarks(data) {
    return {
        type: 'RECEIVE_PLACEMARKS',
        payload: data
    };
}

function receivePlacemarkById(data) {
    return {
        type: 'RECEIVE_PLACEMARK_BY_ID',
        payload: data
    };
}

function visitPlacemark(id) {
    return (dispatch) => {
        dispatch(loadingStart('Visiting placemark...'));
        dispatch(apiReq('put', 'users/addplacemark', {placemarkId: id}, visitSuccess));
    };
}

function visitSuccess(data) {
    return (dispatch, getState) => {
        const placemarks = getState().data.placemarks;
        for (var i = 0; i < placemarks.length; i++) {
            if (placemarks[i]._id === data.id) {
                dispatch({type: 'PLACEMARK_VISIT_SUCCESS', payload: placemarks[i]});
                dispatch(showModal(placemarks[i].name + ' was visited!'));
                break;
            }
        }
    };
}

module.exports = {
    getPlacemarks,
    getPlacemarkById,
    getMyPlacemarks,
    receivePlacemarks,
    visitPlacemark
}