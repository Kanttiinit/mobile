'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import moment from 'moment';
import formatMenus from './menu-formatter';

import Menu from '../components/views/Menu';
import Favorites from '../components/views/Favorites';
import Restaurants from '../components/views/Restaurants';

const defaultState = {
   currentView: 'MENU',
   views: [
      { title: 'MENU', icon: 'android-restaurant', component: Menu },
      { title: 'SUOSIKIT', icon: 'android-favorite', component: Favorites },
      { title: 'RAVINTOLAT', icon: 'ios-list', component: Restaurants }
   ],
   modal: {
      visible: false,
      component: undefined,
      style: undefined
   },
   selectedFavorites: []
};

const updateMenu = state => {
   return {
      ...state,
      menus: formatMenus(state)
   };
};

const formatFavorites = state => {
   return {
      ...state,
      favorites: state.favorites.map(f => ({
         ...f,
         selected: state.selectedFavorites.some(x => x === f.id)
      }))
      .sort((a, b) => {
         if (a.selected && !b.selected)
            return -1;
         else if (!a.selected && b.selected)
            return 1;

         return a.name > b.name ? 1 : -1;
      })
   };
};

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case 'SHOW_MODAL':
         return {
            ...state,
            modal: {
               visible: true,
               component: action.component,
               style: action.style
            }
         };
      case 'DISMISS_MODAL':
         return {
            ...state,
            modal: {
               visible: false,
               component: undefined,
               style: state.modal.style
            }
         };
      case 'CHANGE_VIEW':
         return {...state, currentView: action.view, viewChanges: (state.viewChanges || 0) + 1};
      case 'SET_AREAS':
         return {...state, areas: action.areas};
      case 'SET_FAVORITES':
         return formatFavorites({...state, favorites: action.favorites});
      case 'SET_SELECTED_RESTAURANTS':
         return {...state, selectedRestaurants: action.restaurants};
      case 'SET_RESTAURANTS_LOADING':
         return {...state, restaurantsLoading: action.loading};

      // the following require an update of the restaurant list
      case 'UPDATE_NOW':
         return updateMenu({
            ...state,
            now: moment(),
            days: Array(7).fill(1).map((n, i) => moment().add(i, 'days'))
         });
      case 'SET_SELECTED_FAVORITES':
         return updateMenu(formatFavorites({...state, selectedFavorites: action.favorites}));
      case 'SET_LOCATION':
         return updateMenu({...state, location: action.location});
      case 'SET_RESTAURANTS':
         return updateMenu({...state, restaurants: action.restaurants, restaurantsLoading: false});
      default:
         return state;
   }
};

export default createStore(reducer, applyMiddleware(thunk));
