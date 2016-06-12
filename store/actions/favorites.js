import HttpCache from '../HttpCache';
import storage from '../storage';

import {updateMenus} from './menus';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const SET_SELECTED_FAVORITES = 'SET_SELECTED_FAVORITES';

function setSelectedFavorites(promise) {
   return dispatch => {
      return dispatch({
         type: SET_SELECTED_FAVORITES,
         payload: promise
      })
      .then(() => dispatch(updateMenus()));
   };
}

export function fetchSelectedFavorites(selected) {
   return setSelectedFavorites(
      storage.getList('selectedFavorites')
         .then(favorites => favorites || [])
   );
}

export function addFavorite(id) {
   return setSelectedFavorites(
      storage.getList('selectedFavorites')
      .then(selectedFavorites => {
         if (!selectedFavorites.some(f => f === id)) {
            selectedFavorites.push(id);
            return storage.setList('selectedFavorites', selectedFavorites)
            .then(() => selectedFavorites);
         }
      })
   );
}

export function removeFavorite(id) {
   return setSelectedFavorites(
      storage.getList('selectedFavorites')
      .then(selectedFavorites => {
         const favorites = selectedFavorites.filter(x => x !== id);
         return storage.setList('selectedFavorites', favorites)
         .then(() => favorites);
      })
   );
}

export function fetchFavorites() {
   return {
      type: FETCH_FAVORITES,
      payload: HttpCache.get('favorites', '/favorites', {hours: 1})
   };
}
