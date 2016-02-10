'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import haversine from 'haversine';

import {setSelectedRestaurants, setFavorites} from './actions';
import storage from './storage';

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
   areas: [],
   areasLoading: false,
   modal: {
      visible: false,
      component: undefined
   },
   favorites: [],
   selectedRestaurants: undefined,
   location: {},
   restaurants: undefined
};

const escapeRegExp = str => {
   return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


const isFavorite = (title, favorites) => {
   if (title && favorites.length)
      return favorites.some(f => title.toLowerCase().match(escapeRegExp(f.name.toLowerCase())));

   return false;
};

const setRestaurantDistances = (restaurants, location) =>
   restaurants.map(r => {
      if (r.latitude && r.longitude)
         r.distance = haversine(location, r) * 1000;
      return r;
   });

const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case 'SHOW_MODAL':
         return {
            ...state,
            modal: {
               visible: true,
               component: action.component
            }
         };
      case 'DISMISS_MODAL':
         return {
            ...state,
            modal: {
               visible: false,
               component: undefined
            }
         };
      case 'CHANGE_VIEW':
         return {...state, currentView: action.view};
      case 'SET_AREAS_LOADING':
         return {...state, areasLoading: action.loading};
      case 'SET_AREAS':
         return {...state, areas: action.areas};
      case 'SET_FAVORITES':
         return {
            ...state,
            favorites: action.favorites
         };
      case 'SET_SELECTED_RESTAURANTS':
         return {...state, selectedRestaurants: action.restaurants};
      case 'SET_LOCATION':
         const location = action.location;
         const changeObject = {location};
         if (state.restaurants && location && location.latitude && location.longitude)
            changeObject.restaurants = setRestaurantDistances(state.restaurants, location);

         return {...state, ...changeObject};
      case 'SET_RESTAURANTS':
         const existingLocation = state.location;
         let restaurants = action.restaurants;
         if (existingLocation && existingLocation.latitude && existingLocation.longitude)
            restaurants = setRestaurantDistances(restaurants, existingLocation);

         return {...state, restaurants};
      default:
         return state;
   }
};

const store = createStore(reducer, applyMiddleware(thunk));

storage.getList('selectedRestaurants').then(s => store.dispatch(setSelectedRestaurants(s)));
storage.getList('storedFavorites').then(favorites => store.dispatch(setFavorites(favorites)));

export default store;
