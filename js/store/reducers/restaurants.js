import typeToReducer from 'type-to-reducer';
import Immutable from 'immutable';
import {REHYDRATE} from 'redux-persist/constants';

import {SET_SELECTED_RESTAURANTS, FETCH_RESTAURANTS, SET_FAVORITED_RESTAURANTS} from '../actions/restaurants';

export default typeToReducer({
   [REHYDRATE]: (state, {payload: {restaurants = {}}}) => ({
      ...state,
      ...restaurants,
      selected: new Immutable.Set(restaurants.selected),
      favorited: new Immutable.Set(restaurants.favorited)
   }),
   [SET_SELECTED_RESTAURANTS]: (state, {payload: {ids, areSelected}}) => ({
      ...state,
      selected: areSelected ? state.selected.union(ids) : state.selected.subtract(ids)
   }),
   [SET_FAVORITED_RESTAURANTS]: (state, {payload: {ids, areFavorited}}) => ({
      ...state,
      favorited: areFavorited ? state.favorited.union(ids) : state.favorited.subtract(ids)
   }),
   [FETCH_RESTAURANTS]: {
      PENDING: state => ({...state, loading: true}),
      FULFILLED: (state, {payload: restaurants}) =>
         ({...state, loading: false, restaurants})
   }
}, {
   selected: new Immutable.Set(),
   favorited: new Immutable.Set(),
   restaurants: []
});
