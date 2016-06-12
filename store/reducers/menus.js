import formatMenus from '../menu-formatter';

import {UPDATE_MENUS} from '../actions/menus';

export default function(state = [], action) {
   if (action.type === 'UPDATE_MENUS') {
      const s = action.getState();
      return formatMenus(
         s.misc.days,
         s.restaurants.restaurants,
         s.misc.now,
         s.favorites.favorites,
         s.misc.location
      ) || [];
   }
   return state;
}
