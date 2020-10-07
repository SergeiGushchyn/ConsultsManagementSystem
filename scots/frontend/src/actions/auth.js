/**
 *  Authentication code example was used from Traversy Media
 *  https://www.youtube.com/watch?v=Uyei2iDA4Hs
 */

import axios from 'axios';
import {
   USER_LOADING,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT_SUCCESS,
   REGISTER_SUCCESS,
   REGISTER_FAIL
} from './types';

// Load user
export const loadUser = () => (dispatch, getState) => {
   dispatch({ type: USER_LOADING });

   axios.get('api/auth/user', tokenConfig(getState))
      .then(res => {
         dispatch({
            type: USER_LOADED,
            payload: res.data
         });
      }).catch(err => {
         console.log(err.response.data);
         dispatch({
            type: AUTH_ERROR
         })
      })
}

// Login user
export const login = (username, password) => dispatch => {
   // headers
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }
   // body
   const body = JSON.stringify({ username, password });

   axios.post('api/auth/login', body, config)
      .then(res => {
         dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
         });
      }).catch(err => {
         console.log(err.response.data);
         dispatch({
            type: LOGIN_FAIL
         })
      })
}

// Register user
export const register = ({ username, firstName, lastName, password }) => dispatch => {
   // headers
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // body
   const body = JSON.stringify({
      username: username, first_name: firstName,
      last_name: lastName, password: password
   });

   axios.post('api/auth/register', body, config)
      .then(res => {
         dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
         });
      }).catch(err => {
         console.log(err.response.data);
         dispatch({
            type: REGISTER_FAIL
         })
      })
}

// Logout user
export const logout = () => (dispatch, getState) => {

   axios.post('api/auth/logout/', null, tokenConfig(getState))
      .then(res => {
         dispatch({
            type: LOGOUT_SUCCESS
         });
      }).catch(err => {
         console.log(err.response.data);
      })
}

// Create header with auth token
export const tokenConfig = getState => {
   const token = getState().auth.token;

   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   if (token) {
      config.headers['Authorization'] = `Token ${token}`;
   }
   return config;
}