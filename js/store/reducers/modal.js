// @flow
import {MODAL_OPEN, MODAL_DISMISS} from '../actions/modal';
import type {State} from '../../utils/types';

export default function(state: State = {}, {type, payload}: any) {
  switch (type) {
    case MODAL_OPEN:
      return {
        visible: true, ...payload
      };
    case MODAL_DISMISS:
      return {
        visible: false,
        component: null,
        style: state.style
      };
    default:
      return state;
  }
}
