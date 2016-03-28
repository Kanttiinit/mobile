import HttpCache from './HttpCache';
import storage from './storage';

export const changeView = view => ({
   type: 'CHANGE_VIEW',
   view
});

export const showModal = (component, style) => ({
   type: 'SHOW_MODAL',
   component,
   style
});

export const dismissModal = () => ({
   type: 'DISMISS_MODAL'
});

export const getAreas = () => {
   return dispatch => {
      return HttpCache.get('areas', 'https://api.kanttiinit.fi/areas', {days: '1'})
      .then(areas => {
         dispatch({
            type: 'SET_AREAS',
            areas
         });
      });
   };
};

// selected restaurant actions
export const setSelectedRestaurants = restaurants => ({
   type: 'SET_SELECTED_RESTAURANTS',
   restaurants
});

export const updateSelectedRestaurants = (restaurants, areSelected) => {
   return dispatch => {
      return storage.getList('selectedRestaurants')
      .then(selected => {
         if (areSelected)
            restaurants.forEach(r => selected.push(r.id));
         else
            selected = selected.filter(id => !restaurants.some(r => r.id === id));

         dispatch(setSelectedRestaurants(selected));
         return storage.setList('selectedRestaurants', selected);
      })
      //.then(() => HttpCache.reset('menus'));
   };
};

// favorite actions
export const getFavorites = _ => {
   return dispatch => {
      return HttpCache.get('favorites', 'https://api.kanttiinit.fi/favorites', {hours: 1})
      .then(favorites => {
         dispatch({
            type: 'SET_FAVORITES',
            favorites
         });
      });
   };
};

export const setSelectedFavorites = favorites => ({
   type: 'SET_SELECTED_FAVORITES',
   favorites
});

export const addFavorite = id => {
   return dispatch => {
      return storage.getList('selectedFavorites')
      .then(selectedFavorites => {
         if (!selectedFavorites.some(f => f === id)) {
            selectedFavorites.push(id);
            dispatch(setSelectedFavorites(selectedFavorites));
            return storage.setList('selectedFavorites', selectedFavorites);
         }
      });
   };
};

export const removeFavorite = id => {
   return dispatch => {
      return storage.getList('selectedFavorites')
      .then(selectedFavorites => {
         const favorites = selectedFavorites.filter(x => x !== id);
         dispatch(setSelectedFavorites(favorites));
         return storage.setList('selectedFavorites', favorites);
      });
   };
};

// location
export const updateLocation = () => {
   return dispatch => {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            position => resolve(position.coords),
            error => console.log(error.message),
            {timeout: 3000, maximumAge: 60000}
         );
      }).then(location => {
         dispatch({
            type: 'SET_LOCATION',
            location
         });
      });
   };
};

// restaurants
export const getRestaurants = selectedRestaurants => {
   return dispatch => {
      if (selectedRestaurants.length) {
         dispatch({
            type: 'SET_RESTAURANTS_LOADING',
            loading: true
         });
         return HttpCache.get('menus', 'https://api.kanttiinit.fi/menus/' + selectedRestaurants.sort().join(','), {hours: 3})
         .then(restaurants => {
            dispatch({
               type: 'SET_RESTAURANTS',
               restaurants
            });
         });
      }

      dispatch({
         type: 'SET_RESTAURANTS',
         restaurants: []
      });
   };
};
