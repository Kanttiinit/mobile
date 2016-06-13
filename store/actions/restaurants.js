import storage from '../storage';
import HttpCache from '../HttpCache';

import {fetchMenus} from './menus';

export const SET_SELECTED_RESTAURANTS = 'SET_SELECTED_RESTAURANTS';
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';

function setSelectedRestaurants(payload) {
   return dispatch => {
      dispatch({
         type: SET_SELECTED_RESTAURANTS,
         payload
      })
      .then(({value}) => dispatch(fetchMenus(value)));
   };
}

export function updateSelectedRestaurants(restaurants, areSelected) {
   return setSelectedRestaurants(
      storage.getList('selectedRestaurants')
      .then(selected => {
         if (areSelected)
            restaurants.forEach(r => selected.push(r.id));
         else
            selected = selected.filter(id => !restaurants.some(r => r.id === id));

         return storage.setList('selectedRestaurants', selected)
         .then(() => selected);
      })
   );
}

export function fetchSelectedRestaurants() {
   return setSelectedRestaurants(
      storage.getList('selectedRestaurants')
      .then(selected => selected || [])
   );
}

export function fetchRestaurants() {
   return {
      type: FETCH_RESTAURANTS,
      payload: HttpCache.get('restaurants', '/restaurants', {days: 1})
   };
}
