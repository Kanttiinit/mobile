import typeToReducer from 'type-to-reducer';;
import Immutable from 'immutable';
import {REHYDRATE} from 'redux-persist/constants';

import {SET_SELECTED_FAVORITE} from '../actions/favorites';

export default typeToReducer({
   [REHYDRATE]: (state, {payload: {selectedFavorites}}) =>
      Immutable.Set(selectedFavorites),
   [SET_SELECTED_FAVORITE]: (state, {payload: {id, isSelected}}) =>
      isSelected ? state.add(id) : state.delete(id)
}, Immutable.Set());
