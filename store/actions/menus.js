import HttpCache from '../HttpCache';

export const FETCH_MENUS = 'FETCH_MENUS';

export function fetchMenus(restaurantIds) {
   const idString = restaurantIds.join(',');
   return {
      type: FETCH_MENUS,
      payload: HttpCache.get('menus', `/menus?restaurants=${idString}`, {hours: 3})
   };
}
