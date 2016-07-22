import typeToReducer from 'type-to-reducer';
import _ from 'lodash';
import Immutable from 'immutable';
import {REHYDRATE} from 'redux-persist/constants';

import {FETCH_FAVORITES, SET_SELECTED_FAVORITE} from '../actions/favorites';

function getFormattedFavorites(favorites, selectedFavorites) {
   if (favorites)
      return _.orderBy(
         favorites.map(f =>
            ({
               ...f,
               selected: selectedFavorites.has(f.id)
            })
         ),
         ['selected', 'name'], ['desc', 'asc']
      );

   return [];
};

export default typeToReducer({
   [REHYDRATE]: (state, {payload: {favorites}}) => ({
      ...state,
      ...favorites,
      selected: new Immutable.Set(favorites.selected)
   }),
   [FETCH_FAVORITES]: {
      PENDING: (state, {payload}) => ({...state, loading: true}),
      FULFILLED(state, action) {
         const items = getFormattedFavorites(action.payload, state.selected);
         return {...state, items, loading: false};
      }
   },
   [SET_SELECTED_FAVORITE](state, {payload: {id, isSelected}}) {
      const selected = isSelected ? state.selected.add(id) : state.selected.delete(id);
      const items = getFormattedFavorites(state.items, selected);
      return {...state, items, selected};
   }
}, {
   selected: new Immutable.Set(),
   items: [],
   loading: false
});
