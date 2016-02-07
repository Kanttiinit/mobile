'use strict';

import {createStore} from 'redux';

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
   favorites: [],
   restaurants: [],
   selectedRestaurants: [],
   location: {},
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
         return change(state, {
            currentView: action.view
         });
      default:
         return state;
   }
};

const store = createStore(reducer);

export default store;
