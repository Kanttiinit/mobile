import typeToReducer from 'type-to-reducer';
import moment from 'moment';
import {UPDATE_LOCATION, UPDATE_NOW, SET_CURRENT_VIEW, SET_KEYBOARD_VISIBLE} from '../actions/misc';

export default typeToReducer({
   [UPDATE_LOCATION]: {
      FULFILLED: (state, action) => ({...state, location: action.payload}),
   },
   [UPDATE_NOW]: (state, action) => ({
      ...state,
      now: action.payload,
      days: Array(7).fill(1).map((n, i) => moment(action.payload).add(i, 'days'))
   }),
   [SET_CURRENT_VIEW]: (state, action) => ({
      ...state,
      currentView: action.payload,
      views: (state.views || 0) + 1
   }),
   [SET_KEYBOARD_VISIBLE]: (state, action) => ({...state, keyboardVisible: action.payload})
}, {
   currentView: 'RUOKALISTA'
});
