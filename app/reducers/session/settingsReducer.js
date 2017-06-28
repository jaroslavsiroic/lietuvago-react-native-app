const initialState = {
    mapStyle: 'retro'
};

export default function settingsReducer(state = initialState, action) {
    const { payload, type } = action;

    switch(type) {
        case 'MAP_STYLE_CHANGE':
            state = Object.assign({}, state);
            state.mapStyle = payload;
        break;
        case 'USER_LOGOUT':
            state = Object.assign({}, initialState);
        break;
    }
    return state;
}