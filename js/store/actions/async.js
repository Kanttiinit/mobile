import HttpCache from '../../utils/HttpCache';

export const fetchAreas = () => ({
  type: 'FETCH_AREAS',
  payload: HttpCache.get('areas', '/areas', {days: '1'}),
  meta: {
    data: 'areas'
  }
});

export const fetchFavorites = () => ({
  type: 'FETCH_FAVORITES',
  payload: HttpCache.get('favorites', '/favorites', {hours: 1}),
  meta: {
    data: 'favorites'
  }
});

export const fetchLocation = () => ({
  type: 'FETCH_LOCATION',
  payload: new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position.coords),
      error => console.log('could not get location', error),
      {timeout: 3000, maximumAge: 60000}
    );
  }),
  meta: {data: 'location'}
});

export const fetchMenus = () => (dispatch, getState) => {
  const idString = getState().preferences.selectedRestaurants.join(',');
  return dispatch({
    type: 'FETCH_MENUS',
    payload: HttpCache.get(`menus-${idString}`, `/menus?restaurants=${idString}`, {hours: 3}),
    meta: {
      data: 'menus'
    }
  });
};

export const fetchRestaurants = () => ({
  type: 'FETCH_RESTAURANTS',
  payload: HttpCache.get('restaurants', '/restaurants', {days: 1}),
  meta: {
    data: 'restaurants'
  }
});
