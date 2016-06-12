import HttpCache from '../HttpCache';
import storage from '../storage';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const SET_SELECTED_FAVORITES = 'SET_SELECTED_FAVORITES';

export function setSelectedFavorites(selectedFavorites) {
   return {
      type: SET_SELECTED_FAVORITES,
      payload: selectedFavorites
   };
}

export function addFavorite(id) {
   return dispatch =>
      storage.getList('selectedFavorites')
      .then(selectedFavorites => {
         if (!selectedFavorites.some(f => f === id)) {
            selectedFavorites.push(id);
            dispatch(setSelectedFavorites(selectedFavorites));
            return storage.setList('selectedFavorites', selectedFavorites);
         }
      });
}

export function removeFavorite(id) {
   return dispatch =>
      storage.getList('selectedFavorites')
      .then(selectedFavorites => {
         const favorites = selectedFavorites.filter(x => x !== id);
         dispatch(setSelectedFavorites(selectedFavorites));
         return storage.setList('selectedFavorites', favorites);
      });
}

export function fetchFavorites() {
   return {
      type: FETCH_FAVORITES,
      payload: HttpCache.get('favorites', '/favorites', {hours: 1})
   };
}
