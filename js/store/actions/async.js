// @flow
import HttpCache from '../../utils/HttpCache';
import type {Lang} from '../../utils/types';

export const fetchAreas = (lang: Lang) => ({
  type: 'FETCH_AREAS',
  payload: HttpCache.get('areas', '/areas?', lang, {days: '1'}),
  meta: {
    data: 'areas'
  }
});

export const fetchFavorites = (lang: Lang) => ({
  type: 'FETCH_FAVORITES',
  payload: HttpCache.get('favorites', '/favorites?', lang, {hours: 1}),
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
      {timeout: 5000, maximumAge: 60000, enableHighAccuracy: false}
    );
  }),
  meta: {data: 'location'}
});

export const fetchMenus = (lang: Lang) => (dispatch: any, getState: any) => {
  const idString = getState().preferences.selectedRestaurants.join(',');
  return dispatch({
    type: 'FETCH_MENUS',
    payload: HttpCache.get(`menus-${idString}`, `/menus?restaurants=${idString}`, lang, {hours: 3}),
    meta: {
      data: 'menus'
    }
  });
};

export const fetchRestaurants = (lang: Lang) => ({
  type: 'FETCH_RESTAURANTS',
  payload: HttpCache.get('restaurants', '/restaurants?', lang, {days: 1}),
  meta: {
    data: 'restaurants'
  }
});
