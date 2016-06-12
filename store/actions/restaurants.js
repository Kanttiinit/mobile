import storage from '../storage';
import HttpCache from '../HttpCache';

export const SET_SELECTED_RESTAURANTS = 'SET_SELECTED_RESTAURANTS';
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';

export function updateSelectedRestaurants(restaurants, areSelected) {
   return {
      type: SET_SELECTED_RESTAURANTS,
      payload: storage.getList('selectedRestaurants')
         .then(selected => {
            if (areSelected)
               restaurants.forEach(r => selected.push(r.id));
            else
               selected = selected.filter(id => !restaurants.some(r => r.id === id));

            return storage.setList('selectedRestaurants', selected)
            .then(() => selected);
         })
   }
}

export function fetchSelectedRestaurants() {
   return {
      type: SET_SELECTED_RESTAURANTS,
      payload: storage.getList('selectedRestaurants')
         .then(selected => selected || [])
   };
}

export function fetchRestaurants(selectedRestaurants) {
   const queryString = selectedRestaurants.sort().join(',');
   return {
      type: FETCH_RESTAURANTS,
      payload: HttpCache.get('menus', `/menus/${queryString}`, {hours: 3})
   };
}
