import { combineReducers } from 'redux';
import dataReducer from './data';
import sessionReducer from './session';
import communicationReducer from './communication';

module.exports = combineReducers({
  data: dataReducer,
  session: sessionReducer,
  communication: communicationReducer
});
