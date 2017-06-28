import { receivePlacemarks } from './placemarkActions';

function rad(x) {
    return x * Math.PI / 180;
}

function getDistance(p1, p2) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = rad(p2.lat - p1.lat);
    const dLong = rad(p2.lng - p1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; // returns the distance in meter
}

function locationStateChange(payload) {
    return dispatch => {
        dispatch({type: 'LOCATION_STATE_CHANGE', payload: payload});
        dispatch(calculateDistanceToPlacemarks());
    }
}

function calculateDistanceToPlacemarks() {
    return (dispatch, getState) => {
        const state = getState();

        const placemarks = state.data.placemarks;
        const currentLocation = state.session.location.currentLocation;

        const currentLoc = {
            lat: currentLocation.coords.latitude,
            lng: currentLocation.coords.longitude
        };

        const lcl = state.session.location.lastCalculatedLocation;

        if (placemarks.length > 0 && ( Object.keys(lcl).length === 0 ||
            getDistance(currentLoc, {lat: lcl.coords.latitude, lng: lcl.coords.longitude}) > 500) ) {

            let sortedPlacemarks = placemarks.sort((a, b) => {
                dist2a = getDistance(currentLoc, {lat: a.latitude, lng: a.longitude});
                dist2b = getDistance(currentLoc, {lat: b.latitude, lng: b.longitude});

                if (dist2a < dist2b) return -1;
                if (dist2a > dist2b) return 1;
                return 0;
            });
            dispatch(receivePlacemarks(sortedPlacemarks));
            dispatch(locationDistanceCalculation(currentLocation));
        } else return;
    };
}

function locationDistanceCalculation(payload) {
    return {
        type: 'LOCATION_DISTANCE_CALCULATION',
        payload: payload
    };
}

module.exports = {
    locationStateChange,
    locationDistanceCalculation,
    getDistance
}