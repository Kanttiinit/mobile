import typeToReducer from 'type-to-reducer';

import {SET_SELECTED_RESTAURANTS, FETCH_RESTAURANTS, SET_FAVORITED_RESTAURANTS} from '../actions/restaurants';

export default typeToReducer({
   [SET_SELECTED_RESTAURANTS]: {
      FULFILLED: (state, {payload: selected}) => ({...state, selected})
   },
   [SET_FAVORITED_RESTAURANTS]: {
      FULFILLED: (state, {payload: favorited}) => ({...state, favorited})
   },
   [FETCH_RESTAURANTS]: {
      PENDING: state => ({...state, loading: true}),
      FULFILLED: (state, {payload: restaurants}) =>
         ({...state, loading: false, restaurants})
   }
}, {
   selected: [],
   favorited: [],
   restaurants: []
});
