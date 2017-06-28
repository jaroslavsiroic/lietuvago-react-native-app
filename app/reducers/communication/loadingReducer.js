const initialState = {
    isLoading: false,
    loadingText: ''
};

export default function loadingReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOADING_START':
            state = Object.assign({}, state);
            state.isLoading = true;
            state.loadingText = action.text;
        break;
        case 'LOADING_END':
            state = Object.assign({}, initialState);
        break;
    }
    return state;
}