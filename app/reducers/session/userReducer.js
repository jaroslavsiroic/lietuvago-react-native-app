const initialState = {
    isLoggedIn: false,
    token: '',
    username: '',
};

export default function userReducer(state = initialState, action) {
    const { payload, type } = action;

    switch(type) {
        case 'USER_LOGIN':
            state = Object.assign({}, state);
            state.isLoggedIn = true;
            state.token = payload.token;
            state.username = payload.username;
        break;
        case 'USER_LOGOUT':
            state = Object.assign({}, initialState);
        break;
    }
    return state;
}