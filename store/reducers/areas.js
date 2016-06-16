import typeToReducer from 'type-to-reducer';

import {FETCH_AREAS} from '../actions/areas';

export default typeToReducer({
   [FETCH_AREAS]: {
      PENDING: (state, {payload}) => ({...state, loading: true}),
      FULFILLED: (state, {payload}) => ({
         ...state,
         items: payload,
         loading: false
      })
   }
}, {
   items: [],
   loading: false
});
