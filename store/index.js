'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {setSelectedRestaurants, setFavorites} from './actions';
import storage from './storage';

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
   },
   favorites: [],
   selectedRestaurants: [],
   location: {}
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
      case 'SET_FAVORITES':
         return change(state, {favorites: action.favorites});
      case 'SET_SELECTED_RESTAURANTS':
         return change(state, {selectedRestaurants: action.restaurants});
      case 'SET_LOCATION':
         return change(state, {location: action.location});
      default:
         return state;
   }
};

const store = createStore(reducer, applyMiddleware(thunk));

storage.getList('selectedRestaurants').then(s => store.dispatch(setSelectedRestaurants(s)));
storage.getList('storedFavorites').then(favorites => store.dispatch(setFavorites(favorites)));

export default store;
