const initialState = {
    showSplash: true
};

export default function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_SPLASH':
            state = Object.assign({}, initialState);
        break;
        case 'persist/REHYDRATE':
            state = Object.assign({}, state);
            state.showSplash = false;
        break;
    }
    return state;
}