import typeToReducer from 'type-to-reducer';
import {UPDATE_LOCATION, UPDATE_NOW, SET_CURRENT_VIEW} from '../actions/misc';

export function location(state = {}, action) {
   if (action.type === `${UPDATE_LOCATION}_FULFILLED`)
      return action.payload;
   return state;
}

export function now(state = {}, action) {
   if (action.type === UPDATE_NOW)
      return action.payload;
   return state;
}

export function days(state = [], action) {
   if (action.type === UPDATE_NOW)
      return Array(7).fill(1).map((n, i) => action.payload.add(i, 'days'));
   return state;
}

export function currentView(state = 'SUOSIKIT', action) {
   if (action.type === SET_CURRENT_VIEW)
      return action.payload;
   return state;
}

export function views(state = 0, action) {
   if (action.type === SET_CURRENT_VIEW)
      return state + 1;
   return state;
}
