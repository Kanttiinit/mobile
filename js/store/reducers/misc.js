import typeToReducer from 'type-to-reducer';
import moment from 'moment';
import _ from 'lodash';
import {UPDATE_LOCATION, UPDATE_NOW, SET_DAY_OFFSET, SET_CURRENT_VIEW, SET_KEYBOARD_VISIBLE, SET_INITIALIZING} from '../actions/misc';

export default typeToReducer({
   [UPDATE_LOCATION]: {
      REJECTED: (state, action) => state,
      FULFILLED: (state, action) => ({...state, location: action.payload}),
   },
   [UPDATE_NOW]: (state, action) => ({
      ...state,
      now: action.payload,
      days: _.times(7, i => moment(action.payload).add(i, 'days').format('YYYY-MM-DD'))
   }),
   [SET_CURRENT_VIEW]: (state, action) => ({
      ...state,
      currentView: action.payload,
      views: state.views + 1
   }),
   [SET_KEYBOARD_VISIBLE]: (state, action) => ({...state, keyboardVisible: action.payload}),
   [SET_DAY_OFFSET]: (state, {payload}) => ({...state, dayOffset: payload}),
   [SET_INITIALIZING]: (state, {payload}) => ({...state, initializing: payload})
}, {
   currentView: 'Ruokalista',
   views: 0,
   dayOffset: 0,
   initializing: true
});
