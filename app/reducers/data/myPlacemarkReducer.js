const initialState = [];

export default function myPlacemarkReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case 'RECEIVE_MY_PLACEMARKS':
            state = Object.assign([], state);
            state = payload;
        break;
        case 'PLACEMARK_VISIT_SUCCESS':
            state = Object.assign([], state);
            state.push(payload);
        break;
    }
    return state;
}