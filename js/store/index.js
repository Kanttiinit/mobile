import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import devTools from 'remote-redux-devtools';
import {autoRehydrate} from 'redux-persist';

import preferences from './reducers/preferences';
import modal from './reducers/modal';

const reducer = combineReducers({
   preferences,
   modal,
   value: (state = {}, {type, payload}) => {
      if (type.startsWith('SET_VALUE_')) {
         return {...state, ...payload};
      }
      return state;
   },
   pending: (state = {}, {type, payload, meta = {}}) => {
      const key = meta.data;
      if (key) {
         if (type.endsWith('_FULFILLED') || type.endsWith('_REJECTED')) {
            return {...state, [key]: false};
         } else if (type.endsWith('_PENDING')) {
            return {...state, [key]: true};
         }
      }
      return state;
   },
   data: (state = {}, {type, payload, meta = {}}) => {
      const key = meta.data;
      if (key && type.endsWith('_FULFILLED')) {
         return {...state, [key]: payload};
      }
      return state;
   },
   error: (state = {}, {type, payload, meta = {}}) => {
      const key = meta.data;
      if (key) {
         if (type.endsWith('_FULFILLED')) {
            return {...state, [key]: undefined};
         } else if (type.endsWith('_REJECTED')) {
            return {...state, [key]: payload};
         }
      }
      return state;
   }
});

const enhancer = compose(
   autoRehydrate(),
   applyMiddleware(thunk, promiseMiddleware()),
   devTools()
);

export default createStore(reducer, {
   value: {
      currentView: 'Ruokalista',
      views: 0,
      dayOffset: 0,
      initializing: true
   }
}, enhancer);
