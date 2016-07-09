import typeToReducer from 'type-to-reducer';

import {FETCH_MENUS, SET_DAY_OFFSET} from '../actions/menus';

export default typeToReducer({
   [FETCH_MENUS]: {
      PENDING: state => ({...state, loading: true}),
      FULFILLED: (state, {payload}) => ({
         ...state,
         payload,
         menus: payload,
         loading: false
      })
   },
   [SET_DAY_OFFSET]: (state, {payload}) => ({...state, dayOffset: payload})
}, {
   dayOffset: 0,
   menus: {}
});
