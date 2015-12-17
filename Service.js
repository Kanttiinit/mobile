import React from 'react-native';
import geolib from 'geolib';
import moment from 'moment';

const {
   AsyncStorage
} = React;

export default {
   data: {
      currentLocation: undefined,
      restaurants: undefined,
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
         if (this.data.currentLocation)
         return a.distance - b.distance;
         return a.name > b.name ? 1 : -1;
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
   getOpeningHours(restaurant, date) {
      const weekdays = JSON.parse(restaurant.openingHours);
      const now = Number(moment().format('HHmm'));
      let dayNumber = date.day() - 1;
      let hours = weekdays[dayNumber];
      if (hours && !hours.length) {
         while (dayNumber--) {
            if (weekdays[dayNumber] && weekdays[dayNumber].length) {
               hours = weekdays[dayNumber];
               break;
            }
         }
      }
      return {hours, isOpen: hours && now >= hours[0] && now < hours[1]};
   },
   // download restaurants or serve from cache
   getRestaurants(forceFetch) {
      if (this.data.restaurants && !forceFetch)
      return new Promise(resolve => resolve(this.sortedRestaurants()));

      return this.getSelectedRestaurants()
      .then(selected => fetch('http://api.kanttiinit.fi/menus/' + selected.join(',')))
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
   },
   getAreas() {
      return fetch('http://api.kanttiinit.fi/areas')
      .then(r => r.json());
   },
   getSelectedRestaurants() {
      return AsyncStorage.getItem('selectedRestaurants')
      .then(selectedRestaurants => {
         if (selectedRestaurants)
         return selectedRestaurants;
         return AsyncStorage.setItem('selectedRestaurants', '[1,2,3,4,5]');
      })
      .then(s => JSON.parse(s));
   },
   setSelectedRestaurants(selected) {
      return AsyncStorage.setItem('selectedRestaurants', JSON.stringify(selected));
   },
   selectRestaurant(r) {
      return this.getSelectedRestaurants()
      .then(selected => {
         selected.push(r.id);
         return this.setSelectedRestaurants(selected);
      })
      .then(r => {
         this.getRestaurants(true);
         return r;
      });
   },
   deselectRestaurant(r) {
      return this.getSelectedRestaurants()
      .then(selected => {
         selected.splice(selected.indexOf(r.id), 1);
         return this.setSelectedRestaurants(selected);
      })
      .then(r => {
         this.getRestaurants(true);
         return r;
      });
   }
};
