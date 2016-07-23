import HttpCache from '../../utils/HttpCache';

export const SET_SELECTED_FAVORITE = 'SET_SELECTED_FAVORITE';

export function setIsSelected(value, include) {
   return {
      type: SET_SELECTED_FAVORITE,
      payload: {value, include}
   };
}

export function fetchFavorites() {
   return {
      type: 'FETCH_FAVORITES',
      payload: HttpCache.get('favorites', '/favorites', {hours: 1}),
      meta: {
         data: 'favorites'
      }
   };
}
