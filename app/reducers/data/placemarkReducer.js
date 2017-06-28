const initialState = [];

export default function placemarkReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case 'RECEIVE_PLACEMARKS':
            state = Object.assign([], state);
            state = payload;
        break;
        case 'RECEIVE_PLACEMARK_BY_ID':
            state = Object.assign([], state);
            for (var i = 0; i < state.length; i++) {
                if (state[i].id === payload.id) {
                    state[i] = payload;
                    break;
                }
            }
        break;
    }
    return state;
}