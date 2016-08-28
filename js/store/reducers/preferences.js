// @flow
import {combineReducers} from 'redux';
import {Set} from 'immutable';
import {REHYDRATE} from 'redux-persist/constants';

import {
  SET_LANG,
  SET_SELECTED_FAVORITE,
  SET_SELECTED_RESTAURANTS,
  SET_FAVORITED_RESTAURANTS
} from '../actions/preferences';

const createNumberListReducer = (actionType, key) =>
(state = Set([-1]), {type, payload}) => {
  if (type === REHYDRATE && payload.preferences) {
    return Set(payload.preferences[key]);
  } else if (type === actionType) {
    const {include, value, values} = payload;
    if (value) {
      if (include)
        return state.add(value);
      else
        return state.delete(value);
    } else if (values) {
      if (include)
        return state.union(values);
      else
        return state.subtract(values);
    }
  }
  return state;
};

export default combineReducers({
  selectedFavorites: createNumberListReducer(SET_SELECTED_FAVORITE, 'selectedFavorites'),
  selectedRestaurants: createNumberListReducer(SET_SELECTED_RESTAURANTS, 'selectedRestaurants'),
  favoritedRestaurants: createNumberListReducer(SET_FAVORITED_RESTAURANTS, 'favoritedRestaurants'),
  lang: (state = 'fi', {type, payload}) => {
    if (type === REHYDRATE && payload.preferences) {
      return payload.preferences.lang;
    } else if (type === SET_LANG) {
      return payload;
    }
    return state;
  }
});
