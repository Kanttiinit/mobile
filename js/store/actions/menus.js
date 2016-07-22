import HttpCache from '../../utils/HttpCache';

export function fetchMenus(restaurantIds) {
   const idString = restaurantIds.join(',');
   return {
      type: 'FETCH_MENUS',
      payload: HttpCache.get(`menus-${idString}`, `/menus?restaurants=${idString}`, {hours: 3}),
      meta: {
         data: 'menus'
      }
   };
}
