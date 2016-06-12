import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import devTools from 'remote-redux-devtools';

import favorites from './reducers/favorites';
import restaurants from './reducers/restaurants';
import modal from './reducers/modal';
import areas from './reducers/areas';
import * as misc from './reducers/misc';

const reducer = combineReducers({
   favorites,
   restaurants,
   modal,
   areas,
   ...misc
});

const enhancer = compose(
   applyMiddleware(thunk, promiseMiddleware()),
   devTools()
);

export default createStore(reducer, enhancer);
