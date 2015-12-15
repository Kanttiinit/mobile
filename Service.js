import geolib from 'geolib';

export default {
   data: {
      currentLocation: undefined,
      restaurants: undefined
   },
   addDistances() {
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
   },
   sortedRestaurants() {
      return this.data.restaurants.sort((a, b) => {
         return a.distance - b.distance;
      });
   },
   getRestaurants() {
      if (this.data.restaurants)
         return new Promise(resolve => resolve(this.sortedRestaurants()));

      return fetch('http://api.kanttiinit.fi/areas/1/menus')
      .then(r => r.json())
      .then(json => {
         this.data.restaurants = json;
         this.addDistances();
         return this.sortedRestaurants();
      });
   },
   updateLocation() {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            position => {
               this.data.currentLocation = position.coords;
               this.addDistances();
               resolve(this.data.currentLocation);
            },
            error => resolve(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
         );
      });
   }
};
