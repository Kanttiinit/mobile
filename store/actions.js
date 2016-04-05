import HttpCache from './HttpCache';
import storage from './storage';

export default {
   getAreas() {
      return HttpCache.get('areas', 'https://api.kanttiinit.fi/areas', {days: '1'})
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
   getFavorites() {
      return HttpCache.get('favorites', 'https://api.kanttiinit.fi/favorites', {hours: 1})
      .then(favorites => this.setFavorites(favorites));
   },
   addFavorite(id) {
      return storage.getList('selectedFavorites')
      .then(selectedFavorites => {
         if (!selectedFavorites.some(f => f === id)) {
            selectedFavorites.push(id);
            this.setSelectedFavorites(selectedFavorites);
            return storage.setList('selectedFavorites', selectedFavorites);
         }
      });
   },
   removeFavorite(id) {
      return storage.getList('selectedFavorites')
      .then(selectedFavorites => {
         const favorites = selectedFavorites.filter(x => x !== id);
         this.setSelectedFavorites(favorites);
         return storage.setList('selectedFavorites', favorites);
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
         return HttpCache.get('menus', 'https://api.kanttiinit.fi/menus/' + selectedRestaurants.sort().join(','), {hours: 3})
         .then(restaurants => this.setRestaurants(restaurants));
      }

      this.setRestaurants([]);
   }
}
