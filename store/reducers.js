import moment from 'moment';

import formatMenus from './menu-formatter';



export default {
   setFavorites(state, f) {
      const favorites = getFormattedFavorites(f, state.selectedFavorites);
      return {
         favorites,
         menus: formatMenus(state.days, state.restaurants, state.now, favorites, state.location) || state.menus
      };
   },
   setSelectedFavorites(state, selectedFavorites) {
      const favorites = getFormattedFavorites(state.favorites, selectedFavorites);
      return {
         selectedFavorites, favorites,
         menus: formatMenus(state.days, state.restaurants, state.now, favorites, state.location) || state.menus
      };
   },
   updateNow(state) {
      return {
         menus: formatMenus(days, state.restaurants, now, state.favorites, state.location) || state.menus
      };
   },
   setLocation(state, location) {
      return {
         location,
         menus: formatMenus(state.days, state.restaurants, state.now, state.favorites, location) || state.menus
      };
   },
   setRestaurants(state, restaurants) {
      return {
         restaurants,
         menus: formatMenus(state.days, restaurants, state.now, state.favorites, state.location) || state.menus
      };
   }
};
