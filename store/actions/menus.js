import HttpCache from '../HttpCache';

export const FETCH_MENUS = 'FETCH_MENUS';
export const SET_DAY_OFFSET = 'SET_DAY_OFFSET';

export function fetchMenus(restaurantIds) {
   const idString = restaurantIds.join(',');
   return {
      type: FETCH_MENUS,
      payload: HttpCache.get(`menus-${idString}`, `/menus?restaurants=${idString}`, {hours: 3})
   };
}

export function setDayOffset(day) {
   return {
      type: SET_DAY_OFFSET,
      payload: day
   };
}
