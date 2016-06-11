import HttpCache from './HttpCache';
import storage from './storage';

const API_BASE = 'https://api.kanttiinit.fi/';

export default {
   getAreas() {
      return HttpCache.get('areas', API_BASE + 'areas', {days: '1'})
      .then(areas => this.setAreas(areas));
   },
   updateSelectedRestaurants(restaurants, areSelected) {
      return storage.getList('selectedRestaurants')
      .then(selected => {
         if (areSelected)
            restaurants.forEach(r => selected.push(r.id));
         else
            selected = selected.filter(id => !restaurants.some(r => r.id === id));

         this.setSelectedRestaurants(selected);
         return storage.setList('selectedRestaurants', selected);
      });
   },
   updateLocation() {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            position => resolve(position.coords),
            error => console.log(error.message),
            {timeout: 3000, maximumAge: 60000}
         );
      }).then(location => this.setLocation(location));
   },
   getRestaurants(selectedRestaurants) {
      if (selectedRestaurants.length) {
         return HttpCache.get('menus', API_BASE + 'menus/' + selectedRestaurants.sort().join(','), {hours: 3})
         .then(restaurants => this.setRestaurants(restaurants));
      }

      this.setRestaurants([]);
   }
}
