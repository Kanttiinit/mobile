// @flow
import GA from 'react-native-google-analytics-bridge';
import {AsyncStorage} from 'react-native';
import {SET_VALUE_CURRENT_VIEW, SET_VALUE_DAY_OFFSET} from '../store/actions/values';
import {MODAL_OPEN, MODAL_DISMISS} from '../store/actions/modal';
import {SET_SELECTED_FAVORITE} from '../store/actions/preferences';
import _ from 'lodash';

GA.setTrackerId('UA-55969084-5');
GA.setAppName('Kanttiinit');

const uuid = () => _.times(128, () => (Math.random() * 16 | 0).toString(16)).join('');

AsyncStorage.getItem('userId')
.then(userId => {
  if (!userId) {
    userId = uuid();
    AsyncStorage.setItem('userId', userId);
  }
  GA.setUser(userId);
});

export default function analyticsMiddleware() {
  return (next: (action: any) => {}) => (action: any) => {
    switch (action.type) {
      case SET_VALUE_CURRENT_VIEW:
        GA.trackScreenView(action.payload.currentView);
        break;
      case SET_VALUE_DAY_OFFSET:
        GA.trackEvent('day changed', String(action.payload.dayOffset));
        break;
      case MODAL_OPEN:
        GA.trackEvent('open modal', action.payload.component.displayName);
        break;
      case MODAL_DISMISS:
        GA.trackEvent('close modal');
        break;
      case SET_SELECTED_FAVORITE:
        GA.trackEvent((action.payload.include ? 'add' : 'remove') + ' favorite', String(action.payload.value));
        break;
    }
    next(action);
  };
}
