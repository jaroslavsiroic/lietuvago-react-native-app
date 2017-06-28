import { combineReducers } from 'redux';
import userReducer from './userReducer';
import settingsReducer from './settingsReducer';
import locationReducer from './locationReducer';

module.exports = combineReducers({
    user: userReducer,
    settings: settingsReducer,
    location: locationReducer
});
