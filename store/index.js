import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import favorites from './reducers/favorites';
import modal from './reducers/modal';

const reducer = combineReducers({
   favorites,
   modal,
   currentView(state, action) {
      if (action.type === 'SET_CURRENT_VIEW') {
         return action.payload;
      }
      return 'SUOSIKIT';
   }
});

export default createStore(reducer, applyMiddleware(thunk, promiseMiddleware()));
