import typeToReducer from 'type-to-reducer';
import formatMenus from '../menu-formatter';

import {FETCH_MENUS} from '../actions/menus';

export default typeToReducer({
   [FETCH_MENUS]: {
      FULFILLED: (state, {payload}) => payload
   }
}, null);
