import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import devTools from 'remote-redux-devtools';

import favorites from './reducers/favorites';
import restaurants from './reducers/restaurants';
import modal from './reducers/modal';
import areas from './reducers/areas';
import misc from './reducers/misc';
import menus from './reducers/menus';

const reducer = combineReducers({
   favorites,
   restaurants,
   modal,
   areas,
   misc,
   menus
});

const getStateToAction = store => next => action => {
  next({ ...action, getState: store.getState });
};

const enhancer = compose(
   applyMiddleware(thunk, promiseMiddleware(), getStateToAction),
   devTools()
);

export default createStore(reducer, enhancer);
