import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import modalReducer from './modalReducer';
import splashReducer from './splashReducer';

module.exports = combineReducers({
    loading: loadingReducer,
    modal: modalReducer,
    splash: splashReducer
});
