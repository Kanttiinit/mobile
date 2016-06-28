import typeToReducer from 'type-to-reducer';

import {SEND_FEEDBACK, SET_MESSAGE} from '../actions/feedback';

export default typeToReducer({
   [SEND_FEEDBACK]: {
      PENDING: state => ({...state, sending: true}),
      REJECTED: (state, {payload: error}) => ({...state, error, sending: false}),
      FULFILLED: state => ({...state, sending: false, sent: true, error: null})
   },
   [SET_MESSAGE]: (state, {payload: message}) => ({...state, message, error: null})
}, {});
