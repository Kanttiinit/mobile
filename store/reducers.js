import moment from 'moment';

import formatMenus from './menu-formatter';



export default {
   changeView(state, currentView) {
      return {
         currentView,
         viewChanges: (state.viewChanges || 0) + 1
      };
   },
   setSelectedRestaurants(state, selectedRestaurants) {
      return {selectedRestaurants};
   },
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
   setAreas(state, areas) {
      return {areas};
   },
   updateNow(state) {
      const now = moment();
      const days = Array(7).fill(1).map((n, i) => moment().add(i, 'days'));
      return {
         now, days,
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
