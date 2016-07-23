import HttpCache from '../../utils/HttpCache';

import {fetchMenus} from './menus';

export const SET_SELECTED_RESTAURANTS = 'SET_SELECTED_RESTAURANTS';
export const SET_FAVORITED_RESTAURANTS = 'SET_FAVORITED_RESTAURANTS';

export function setSelectedRestaurants(values, include) {
   return dispatch => {
      dispatch({
         type: SET_SELECTED_RESTAURANTS,
         payload: {values, include}
      });
      dispatch(fetchMenus());
   };
}

export function setFavoritedRestaurants(values, include) {
   return {
      type: SET_FAVORITED_RESTAURANTS,
      payload: {values, include}
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
