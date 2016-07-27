import HttpCache from '../../utils/HttpCache';

export function fetchAreas() {
   return {
      type: 'FETCH_AREAS',
      payload: HttpCache.get('areas', '/areas', {days: '1'}),
      meta: {
         data: 'areas'
      }
   };
}

export function fetchFavorites() {
   return {
      type: 'FETCH_FAVORITES',
      payload: HttpCache.get('favorites', '/favorites', {hours: 1}),
      meta: {
         data: 'favorites'
      }
   };
}

export function fetchLocation() {
   return {
      type: 'FETCH_LOCATION',
      payload: new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            position => resolve(position.coords),
            error => console.log('could not get location', error),
            {timeout: 3000, maximumAge: 60000}
         );
      }),
      meta: {data: 'location'}
   };
}

export function fetchMenus() {
   return (dispatch, getState) => {
      const idString = getState().preferences.selectedRestaurants.join(',');
      return dispatch({
         type: 'FETCH_MENUS',
         payload: HttpCache.get(`menus-${idString}`, `/menus?restaurants=${idString}`, {hours: 3}),
         meta: {
            data: 'menus'
         }
      });
   };
}

export function fetchRestaurants() {
   return {
      type: 'FETCH_RESTAURANTS',
      payload: HttpCache.get('restaurants', '/restaurants', {days: 1}),
      meta: {
         data: 'restaurants'
      }
   };
}
