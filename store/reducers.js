import moment from 'moment';

import formatMenus from './menu-formatter';

function getFormattedFavorites(favorites, selectedFavorites) {
   if (favorites)
      return favorites.map(f => ({
            ...f,
            selected: selectedFavorites.some(x => x === f.id)
         }))
         .sort((a, b) => {
            if (a.selected && !b.selected)
               return -1;
            else if (!a.selected && b.selected)
               return 1;

            return a.name > b.name ? 1 : -1;
         });

   return [];
};

export default {
   changeView(state, currentView) {
      return {
         currentView,
         viewChanges: (state.viewChanges || 0) + 1
      };
   },
   showModal(state, component, style) {
      return {
         modal: {
            visible: true,
            component,
            style
         }
      };
   },
   dismissModal(state) {
      return {
         modal: {
            visible: false,
            component: undefined,
            style: state.modal.style
         }
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
