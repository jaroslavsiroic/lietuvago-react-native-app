import { combineReducers } from 'redux';
import placemarkReducer from './placemarkReducer';
import myPlacemarkReducer from './myPlacemarkReducer';

module.exports = combineReducers({
    placemarks: placemarkReducer,
    myPlacemarks: myPlacemarkReducer
});
