'use strict';

import HttpCache from '../managers/HttpCache';
import {AsyncStorage} from 'react-native';

export const changeView = view => ({
   type: 'CHANGE_VIEW',
   view
});

export const showModal = component => ({
   type: 'SHOW_MODAL',
   component
});

export const dismissModal = () => ({
   type: 'DISMISS_MODAL'
});

export const setFavorites = favorites => ({
   type: 'SET_FAVORITES',
   favorites
});

export const getAreas = () => {
   return dispatch => {
      dispatch({
         type: 'SET_AREAS_LOADING',
         loading: true
      });

      return HttpCache.get('areas', 'https://api.kanttiinit.fi/areas', {days: '1'})
      .then(areas => {
         dispatch({
            type: 'SET_AREAS_LOADING',
            loading: false
         });

         dispatch({
            type: 'SET_AREAS',
            areas
         });
      });
   };
};

const getStoredFavorites = () =>
   AsyncStorage.getItem('storedFavorites')
   .then(storedFavorites => {
      if (storedFavorites)
         return JSON.parse(storedFavorites);

      return AsyncStorage.setItem('storedFavorites', '[]').then(() => []);
   });

const setStoredFavorites = (f) =>
   AsyncStorage.setItem('storedFavorites', JSON.stringify(f));

export const updateFavorites = () => {
   return dispatch => {
      return getStoredFavorites()
      .then(favorites => dispatch(setFavorites(favorites)));
   };
};

export const addFavorite = name => {
   return dispatch => {
      name = name.toLowerCase();
      return getStoredFavorites()
      .then(storedFavorites => {
         if (!storedFavorites.some(f => f.name === name)) {
            storedFavorites.push({name});
            dispatch(setFavorites(storedFavorites));
            return setStoredFavorites(storedFavorites);
         }
      });
   };
};

export const removeFavorite = name => {
   return dispatch => {
      return getStoredFavorites()
      .then(storedFavorites => {
         const favorites = storedFavorites.filter(f => f.name !== name);
         dispatch(setFavorites(favorites));
         return setStoredFavorites(favorites);
      });
   };
};
