import storage from '../storage';
import HttpCache from '../HttpCache';

import {updateMenus} from './menus';

export const SET_SELECTED_RESTAURANTS = 'SET_SELECTED_RESTAURANTS';
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';

function setSelectedRestaurants(payload) {
   return dispatch => {
      dispatch({
         type: SET_SELECTED_RESTAURANTS,
         payload
      })
      .then(promise => dispatch(fetchRestaurants(promise.value)));
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

export function fetchRestaurants(selectedRestaurants) {
   const queryString = selectedRestaurants.sort().join(',');
   return dispatch => {
      return dispatch({
         type: FETCH_RESTAURANTS,
         payload: HttpCache.get('menus', `/menus/${queryString}`, {hours: 3})
      })
      .then(() => dispatch(updateMenus()));
   };
}
