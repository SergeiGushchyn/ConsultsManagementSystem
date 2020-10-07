import axios from 'axios';

import { GET_CONSULTS, UPDATE_CONSULT } from './types';
import { tokenConfig } from './auth';

export const getConsults = () => (dispatch, getState) => {
   axios.get('/api/consults/', tokenConfig(getState))
      .then(res => {
         dispatch({
            type: GET_CONSULTS,
            payload: res.data
         });
      }).catch(err => console.log(err));
};

export const updateConsult = ({ row, emailSent, firstVisit, reviewed, reportSent, comments }) => (dispatch, getState) => {
   const body = JSON.stringify({
      "row": row, "Email Sent": emailSent, "First Visit": firstVisit, "Report Reviewed": reviewed,
      "Report Sent": reportSent, "Comments": comments
   })
   axios.post('/api/consults/', body, tokenConfig(getState))
      .then(res => {
         dispatch({
            type: UPDATE_CONSULT,
            payload: res.data
         });
      })
      .catch(err =>
         console.log(err));
};