import { GET_CONSULTS } from '../actions/types.js';

const initialState = {
   consults: []
}

export default function (state = initialState, action) {
   switch (action.type) {
      case GET_CONSULTS:
         return {
            ...state,
            consults: action.payload
         };
      default:
         return state;
   }
}