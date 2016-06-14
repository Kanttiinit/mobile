import typeToReducer from 'type-to-reducer';
import haversine from 'haversine';

import {SET_SELECTED_RESTAURANTS, FETCH_RESTAURANTS} from '../actions/restaurants';
import {UPDATE_LOCATION} from '../actions/misc';

function formatRestaurants(restaurants, location) {
   return _.orderBy(
      restaurants.map(restaurant =>
         ({
            ...restaurant,
            distance: location ? haversine(location, restaurant) : undefined
         })
      ),
      ['distance'],
      ['asc']
   );
}

export default typeToReducer({
   [SET_SELECTED_RESTAURANTS]: {
      FULFILLED: (state, {payload}) => ({...state, selected: payload})
   },
   [FETCH_RESTAURANTS]: {
      PENDING: state => ({...state, loading: true}),
      FULFILLED: (state, {payload, getState}) => ({
         ...state,
         loading: false,
         restaurants: formatRestaurants(payload, getState().misc.location)
      })
   },
   [UPDATE_LOCATION]: {
      FULFILLED: (state, {payload}) => ({
         ...state,
         restaurants: formatRestaurants(state.restaurants, payload)
      })
   }
}, {
   selected: [],
   restaurants: []
});
