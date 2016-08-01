import GA from 'react-native-google-analytics-bridge';
import {AsyncStorage} from 'react-native';
import {SET_VALUE_CURRENT_VIEW, SET_VALUE_DAY_OFFSET} from '../store/actions/values';
import {MODAL_OPEN, MODAL_DISMISS} from '../store/actions/modal';
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
  return next => action => {
    switch (action.type) {
      case SET_VALUE_CURRENT_VIEW:
        GA.trackScreenView(action.payload.currentView); break;
      case SET_VALUE_DAY_OFFSET:
        GA.trackEvent('day changed', String(action.payload.dayOffset)); break;
      case MODAL_OPEN:
        GA.trackScreenView(action.type + ': ' + action.payload.component.displayName); break;
      case MODAL_DISMISS:
        GA.trackScreenView(action.type); break;
      default:
        GA.trackEvent('redux action', action.type);
    }
    next(action);
  };
}
