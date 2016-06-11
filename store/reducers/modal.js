import typeToReducer from 'type-to-reducer';
import {OPEN, DISMISS} from '../actions/modal';

export default typeToReducer({
   [OPEN](state, action) {
      return {
         visible: true,
         ...action.payload
      }
   },
   [DISMISS](state, action) {
      return {
         visible: false,
         component: null,
         style: state.style
      };
   }
}, {});
