import typeToReducer from 'type-to-reducer';

import {FETCH_AREAS} from '../actions/areas';

export default typeToReducer({
   [FETCH_AREAS]: {
      FULFILLED(state, action) {
         return action.payload;
      }
   }
}, []);
