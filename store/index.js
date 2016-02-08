'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import Menu from '../views/Menu';
import Favorites from '../views/Favorites';
import Restaurants from '../views/Restaurants';

const defaultState = {
   currentView: 'MENU',
   views: [
      { title: 'MENU', icon: 'android-restaurant', component: Menu },
      { title: 'SUOSIKIT', icon: 'android-favorite', component: Favorites },
      { title: 'RAVINTOLAT', icon: 'ios-list', component: Restaurants }
   ],
   areas: [],
   areasLoading: false,
   modal: {
      visible: false,
      component: undefined
   }
};

const change = (state, changes) =>
   Object.assign({}, state, changes);

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case 'SHOW_MODAL':
         return change(state, {
            modal: {
               visible: true,
               component: action.component
            }
         });
      case 'DISMISS_MODAL':
         return change(state, {
            modal: {
               visible: false,
               component: undefined
            }
         });
      case 'CHANGE_VIEW':
         return change(state, {currentView: action.view});
      case 'SET_AREAS_LOADING':
         return change(state, {areasLoading: action.loading});
      case 'SET_AREAS':
         return change(state, {areas: action.areas});
      default:
         return state;
   }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
