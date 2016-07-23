import HttpCache from '../../utils/HttpCache';

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
