import haversine from 'haversine';

import {SET_SELECTED_RESTAURANTS, FETCH_RESTAURANTS} from '../actions/restaurants';
import {UPDATE_LOCATION} from '../actions/misc';

function formatRestaurants(restaurants, location) {
   return _.orderBy(
      restaurants.map(restaurant =>
         ({
            ...restaurant,
            distance: haversine(location, restaurant)
         })
      ),
      ['distance'],
      ['asc']
   );
}

export default function(state = {selected: [], restaurants: []}, {type, payload}) {
   switch (type) {
      case `${SET_SELECTED_RESTAURANTS}_FULFILLED`:
         return {...state, selected: payload};
      case `${FETCH_RESTAURANTS}_FULFILLED`:
         return {...state, restaurants: payload};
      case `${UPDATE_LOCATION}_FULFILLED`:
         return {...state, restaurants: formatRestaurants(state.restaurants, payload)};
      default:
         return state;
   }
}
