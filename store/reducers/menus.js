import typeToReducer from 'type-to-reducer';
import formatMenus from '../menu-formatter';

import {FETCH_MENUS} from '../actions/menus';

export default typeToReducer({
   [FETCH_MENUS]: {
      PENDING: state => ({...state, loading: true}),
      FULFILLED: (state, {payload}) => ({
         ...state,
         payload,
         menus: payload,
         loading: false
      })
   }
}, {});
