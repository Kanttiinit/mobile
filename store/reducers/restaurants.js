import {UPDATE_SELECTED_RESTAURANTS, FETCH_RESTAURANTS} from '../actions/restaurants';

export default function(state = {selected: []}, action) {
   switch (action.type) {
      case `${UPDATE_SELECTED_RESTAURANTS}_FULFILLED`:
         return {...state, selected: action.payload};
      case `${FETCH_RESTAURANTS}_FULFILLED`:
         return {...state, restaurants: action.payload};
      default:
         return state;
   }
}
