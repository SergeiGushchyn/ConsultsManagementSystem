import { combineReducers } from 'redux';
import consults from './consults';
import auth from './auth';

export default combineReducers({
   consults,
   auth
});