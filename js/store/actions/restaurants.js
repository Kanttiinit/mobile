import HttpCache from '../../utils/HttpCache';

import {fetchMenus} from './menus';

export const SET_SELECTED_RESTAURANTS = 'SET_SELECTED_RESTAURANTS';
export const SET_FAVORITED_RESTAURANTS = 'SET_FAVORITED_RESTAURANTS';

export function setSelectedRestaurants(ids, areSelected) {
   return (dispatch, getState) => {
      dispatch({
         type: SET_SELECTED_RESTAURANTS,
         payload: {ids, areSelected}
      });
      dispatch(fetchMenus(getState().restaurants.selected.toArray()));
   };
}

export function setFavoritedRestaurants(ids, areFavorited) {
   return {
      type: SET_FAVORITED_RESTAURANTS,
      payload: {ids, areFavorited}
   }
}

export function fetchRestaurants() {
   return {
      type: 'FETCH_RESTAURANTS',
      payload: HttpCache.get('restaurants', '/restaurants', {days: 1}),
      meta: {
         data: 'restaurants'
      }
   };
}
