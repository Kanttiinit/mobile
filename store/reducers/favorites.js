import typeToReducer from 'type-to-reducer';

import {FETCH_FAVORITES, SET_SELECTED_FAVORITES} from '../actions/favorites';

function getFormattedFavorites(favorites, selectedFavorites) {
   if (favorites)
      return favorites
         .map(f => ({
            ...f,
            selected: selectedFavorites.some(x => x === f.id)
         }))
         .sort((a, b) => {
            if (a.selected && !b.selected)
               return -1;
            else if (!a.selected && b.selected)
               return 1;

            return a.name > b.name ? 1 : -1;
         });

   return [];
};

export default typeToReducer({
   [FETCH_FAVORITES]: {
      FULFILLED(state, action) {
         const favorites = getFormattedFavorites(action.payload, state.selected);
         return {...state, favorites};
      }
   },
   [SET_SELECTED_FAVORITES]: {
      FULFILLED(state, action) {
         const favorites = getFormattedFavorites(state.favorites, action.payload);
         return {...state, favorites, selected: action.payload};
      }
   }
}, {
   selected: []
});
