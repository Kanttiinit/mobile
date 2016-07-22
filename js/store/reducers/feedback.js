import typeToReducer from 'type-to-reducer';

import {SEND_FEEDBACK, SET_MESSAGE} from '../actions/feedback';

export default typeToReducer({
   [SET_MESSAGE]: (state, {payload: message}) => ({...state, message, error: null})
}, {});
