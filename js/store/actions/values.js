// @flow
import moment from 'moment';
import _ from 'lodash';

export const SET_VALUE_CURRENT_VIEW = 'SET_VALUE_CURRENT_VIEW';
export const SET_VALUE_DAY_OFFSET = 'SET_VALUE_DAY_OFFSET';

export const updateNow = () => ({
  type: 'SET_VALUE_NOW',
  payload: {
    date: new Date(),
    days: _.times(7, i => moment().add(i, 'days').format('YYYY-MM-DD'))
  }
});

export const setCurrentView = (currentView: string) => ({
  type: SET_VALUE_CURRENT_VIEW,
  payload: {currentView}
});

export const setKeyboardVisible = (keyboardVisible: boolean) => ({
  type: 'SET_VALUE_KEYBOARD_VISIBLE',
  payload: {keyboardVisible}
});

export const setDayOffset = (dayOffset: number) => ({
  type: SET_VALUE_DAY_OFFSET,
  payload: {dayOffset}
});

export const setInitializing = (initializing: boolean) => ({
  type: 'SET_VALUE_INITIALIZING',
  payload: {initializing}
});
