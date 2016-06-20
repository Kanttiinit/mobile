import typeToReducer from 'type-to-reducer';
import haversine from 'haversine';
import moment from 'moment';
import _ from 'lodash';

import {SET_SELECTED_RESTAURANTS, FETCH_RESTAURANTS} from '../actions/restaurants';
import {UPDATE_LOCATION} from '../actions/misc';

function isOpen(openingHours, now) {
   const [open, close] = openingHours[now.weekday()].split(' - ').map(n => moment(n, 'HH:mm'));
   return now.isAfter(open) && now.isBefore(close);
}

function formatRestaurants(restaurants, location, now) {
   now = moment(now);
   return _.orderBy(
      restaurants.map(restaurant =>
         ({
            ...restaurant,
            distance: location ? haversine(location, restaurant) : undefined,
            isOpen: isOpen(restaurant.openingHours, now)
         })
      ),
      ['isOpen', 'distance'],
      ['desc', 'asc']
   );
}

export default typeToReducer({
   [SET_SELECTED_RESTAURANTS]: {
      FULFILLED: (state, {payload}) => ({...state, selected: payload})
   },
   [FETCH_RESTAURANTS]: {
      PENDING: state => ({...state, loading: true}),
      FULFILLED: (state, {payload, getState}) => {
         const misc = getState().misc;
         return {
            ...state,
            loading: false,
            restaurants: formatRestaurants(payload, misc.location, misc.now)
         };
      }
   },
   [UPDATE_LOCATION]: {
      FULFILLED: (state, {payload, getState}) => ({
         ...state,
         restaurants: formatRestaurants(state.restaurants, payload, getState().misc.now)
      })
   }
}, {
   selected: [],
   restaurants: []
});
