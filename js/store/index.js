import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import devTools from 'remote-redux-devtools';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';

import favorites from './reducers/favorites';
import restaurants from './reducers/restaurants';
import modal from './reducers/modal';
import misc from './reducers/misc';
import feedback from './reducers/feedback';

const reducer = combineReducers({
   favorites,
   restaurants,
   modal,
   misc,
   feedback,
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

const store = createStore(reducer, enhancer);

persistStore(store, {
   whitelist: ['favorites', 'restaurants'],
   storage: AsyncStorage
});

export default store;
