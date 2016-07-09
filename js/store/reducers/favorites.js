import typeToReducer from 'type-to-reducer';
import _ from 'lodash';

import {FETCH_FAVORITES, SET_SELECTED_FAVORITES} from '../actions/favorites';

function getFormattedFavorites(favorites, selectedFavorites) {
   if (favorites)
      return _.orderBy(
         favorites.map(f =>
            ({
               ...f,
               selected: selectedFavorites.some(x => x === f.id)
            })
         ),
         ['selected', 'name'], ['desc', 'asc']
      );

   return [];
};

export default typeToReducer({
   [FETCH_FAVORITES]: {
      PENDING: (state, {payload}) => ({...state, loading: true}),
      FULFILLED(state, action) {
         const items = getFormattedFavorites(action.payload, state.selected);
         return {...state, items, loading: false};
      }
   },
   [SET_SELECTED_FAVORITES]: {
      FULFILLED(state, action) {
         const items = getFormattedFavorites(state.items, action.payload);
         return {...state, items, selected: action.payload};
      }
   }
}, {
   selected: [],
   items: [],
   loading: false
});
