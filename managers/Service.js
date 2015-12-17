'use strict';

import React from 'react-native';
import geolib from 'geolib';
import moment from 'moment';
import RestaurantsManager from './Restaurants';

const {
   AsyncStorage
} = React;

export default {
   data: {
      currentLocation: undefined,
      restaurants: undefined
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
   },
   // return restaurants sorted by distance and favourite foods
   sortedRestaurants() {
      return this.data.restaurants.sort((a, b) => {
         if (this.data.currentLocation)
            return a.distance - b.distance;
         return a.name > b.name ? 1 : -1;
      });
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
   formatRestaurant(restaurant, date) {
      const courses = restaurant.Menus.find(m => moment(m.date).isSame(date, 'day'));
      restaurant.courses = courses ? courses.courses : [];
      const openingHours = this.getOpeningHours(restaurant, date);
      restaurant.hours = openingHours.hours;
      restaurant.isOpen = openingHours.isOpen;
      return restaurant;
   },
   // download restaurants or serve from cache
   getRestaurants(forceFetch) {
      if (this.data.restaurants && !forceFetch)
         return new Promise(resolve => resolve(this.sortedRestaurants()));

      return RestaurantsManager.getSelectedRestaurants()
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
   }
};
