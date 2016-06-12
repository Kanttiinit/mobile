import typeToReducer from 'type-to-reducer';
import {UPDATE_LOCATION, UPDATE_NOW, SET_CURRENT_VIEW} from '../actions/misc';

export default typeToReducer({
   [UPDATE_LOCATION]: {
      FULFILLED: (state, action) => ({...state, location: action.payload}),
   },
   [UPDATE_NOW]: (state, action) => ({
      ...state,
      now: action.payload,
      days: Array(7).fill(1).map((n, i) => action.payload.add(i, 'days'))
   }),
   [SET_CURRENT_VIEW]: (state, action) => ({
      ...state,
      currentView: action.payload,
      views: (state.views || 0) + 1
   })
}, {});
