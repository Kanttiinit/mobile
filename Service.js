import geolib from 'geolib';

export default {
   data: {
      currentLocation: undefined,
      restaurants: undefined,
      userRestaurantIds: [1, 2, 3, 4, 5],
      restaurantUpdateListener: undefined
   },
   // add distance property to this.data.restaurants if user location is defined
   updateRestaurantDistances() {
      const {currentLocation, restaurants} = this.data;
      if (currentLocation && restaurants)
         this.data.restaurants = restaurants.map(r => {
            if (r.latitude && r.longitude)
               r.distance = geolib.getDistance(
                  {latitude: currentLocation.latitude, longitude: currentLocation.longitude},
                  {latitude: r.latitude, longitude: r.longitude}
               );
            return r;
         });
      if (restaurants)
         this.onRestaurantsUpdated();
   },
   // return restaurants sorted by distance and favourite foods
   sortedRestaurants() {
      return this.data.restaurants.sort((a, b) => {
         return a.distance - b.distance;
      });
   },
   addRestaurantUpdateListener(listener) {
      this.data.restaurantUpdateListener = listener;
   },
   // called when this.data.restaurants is updated
   onRestaurantsUpdated() {
      if (this.data.restaurantUpdateListener)
         this.data.restaurantUpdateListener(this.sortedRestaurants());
   },
   // download restaurants or serve from cache
   getRestaurants(forceFetch) {
      if (this.data.restaurants && !forceFetch)
         return new Promise(resolve => resolve(this.sortedRestaurants()));

      return fetch('http://api.kanttiinit.fi/menus/' + this.data.userRestaurantIds.join(','))
      .then(r => r.json())
      .then(json => {
         this.data.restaurants = json;
         this.updateRestaurantDistances();
         return this.sortedRestaurants();
      });
   },
   // fetch user location
   updateLocation() {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            position => {
               this.data.currentLocation = position.coords;
               this.updateRestaurantDistances();
               resolve(this.data.currentLocation);
            },
            error => resolve(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
         );
      });
   }
};
