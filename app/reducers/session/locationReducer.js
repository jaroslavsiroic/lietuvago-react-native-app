const initialState = {
    currentLocation: {},
    lastCalculatedLocation: {},
    locationCache: []
}

export default function locationReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case 'LOCATION_STATE_CHANGE':
            state = Object.assign({}, state);
            state.currentLocation = payload;
            state.locationCache.push(payload);
        break;
        case 'LOCATION_DISTANCE_CALCULATION':
            state = Object.assign({}, state);
            state.lastCalculatedLocation = payload;
        break;
    }
    return state;
}