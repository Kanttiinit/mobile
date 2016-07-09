import storage from '../../utils/storage';
import HttpCache from '../../utils/HttpCache';

import {fetchMenus} from './menus';

export const SET_SELECTED_RESTAURANTS = 'SET_SELECTED_RESTAURANTS';
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';
export const SET_FAVORITED_RESTAURANTS = 'SET_FAVORITED_RESTAURANTS';

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
      storage.addOrRemoveItemsFromList('selectedRestaurants', restaurants, areSelected)
   );
}

export function fetchSelectedRestaurants() {
   return setSelectedRestaurants(storage.getList('selectedRestaurants'));
}

export function setFavoritedRestaurants(restaurants, areFavorited) {
   return {
      type: SET_FAVORITED_RESTAURANTS,
      payload: storage.addOrRemoveItemsFromList('favoritedRestaurants', restaurants, areFavorited)
   }
}

export function fetchFavoritedRestaurants() {
   return {
      type: SET_FAVORITED_RESTAURANTS,
      payload: storage.getList('favoritedRestaurants')
   };
}

export function fetchRestaurants() {
   return {
      type: FETCH_RESTAURANTS,
      payload: HttpCache.get('restaurants', '/restaurants', {days: 1})
   };
}
