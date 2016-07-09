import HttpCache from '../../utils/HttpCache';
import storage from '../../utils/storage';

export const FETCH_FAVORITES = 'FETCH_FAVORITES';
export const SET_SELECTED_FAVORITES = 'SET_SELECTED_FAVORITES';

function getSelectedFavorites() {
   return storage.getList('selectedFavorites')
      .then(favorites => favorites || []);
}

export function fetchSelectedFavorites(selected) {
   return {
      type: SET_SELECTED_FAVORITES,
      payload: getSelectedFavorites()
   };
}

export function setIsSelected(id, isSelected) {
   return {
      type: SET_SELECTED_FAVORITES,
      payload: getSelectedFavorites()
         .then(selectedFavorites => {
            if (isSelected) {
               if (!selectedFavorites.some(f => f === id)) {
                  selectedFavorites.push(id);
               }
            } else {
               selectedFavorites = selectedFavorites.filter(x => x !== id);
            }
            return storage.setList('selectedFavorites', selectedFavorites)
            .then(() => selectedFavorites);
         })
   };
}

export function fetchFavorites() {
   return {
      type: FETCH_FAVORITES,
      payload: HttpCache.get('favorites', '/favorites', {hours: 1})
   };
}
