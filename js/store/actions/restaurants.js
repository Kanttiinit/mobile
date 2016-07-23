import {fetchMenus} from './api';

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
