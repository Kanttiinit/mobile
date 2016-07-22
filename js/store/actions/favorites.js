import HttpCache from '../../utils/HttpCache';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const SET_SELECTED_FAVORITE = 'SET_SELECTED_FAVORITE';

export function setIsSelected(id, isSelected) {
   return {
      type: SET_SELECTED_FAVORITE,
      payload: {id, isSelected}
   };
}

export function fetchFavorites() {
   return {
      type: FETCH_FAVORITES,
      payload: HttpCache.get('favorites', '/favorites', {hours: 1})
   };
}
