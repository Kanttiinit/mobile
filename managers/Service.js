'use strict';

import React from 'react-native';
import geolib from 'geolib';
import moment from 'moment';
import RestaurantsManager from './Restaurants';
import HttpCache from './HttpCache';

const {
   AsyncStorage
} = React;

export default {
   data: {
      currentLocation: undefined
   },
   // add distance property to this.data.restaurants if user location is defined
   updateRestaurantDistances(restaurants) {
      const {currentLocation} = this.data;
      if (currentLocation && restaurants)
         restaurants = restaurants.map(r => {
            if (r.latitude && r.longitude)
               r.distance = geolib.getDistance(
                  {latitude: currentLocation.latitude, longitude: currentLocation.longitude},
                  {latitude: r.latitude, longitude: r.longitude}
               );
            return r;
         });

      return restaurants;
   },
   // return restaurants sorted by distance and favourite foods
   sortedRestaurants(restaurants, date) {
      return restaurants.sort((a, b) => {
         if (!b.courses.length || !a.courses.length)
            return !b.courses.length ? -1 : 1;

         if (b.isOpen !== a.isOpen)
            return b.isOpen ? 1 : -1;

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
      const openingHours = this.getOpeningHours(restaurant, date);
      return {
         ...restaurant,
         hours: openingHours.hours,
         isOpen: openingHours.isOpen,
         courses: courses ? courses.courses : []
      };
   },
   formatRestaurants(restaurants, date) {
      return this.sortedRestaurants(restaurants.map(r => this.formatRestaurant(r, date)), date);
   },
   // download restaurants or serve from cache
   getRestaurants() {
      return RestaurantsManager.getSelectedRestaurants()
      .then(selected => HttpCache.get('http://api.kanttiinit.fi/menus/' + selected.join(','), {days: '1'}));
   },
   // fetch user location
   updateLocation() {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            position => {
               this.data.currentLocation = position.coords;
               resolve(this.data.currentLocation);
            },
            error => resolve(error.message),
            {timeout: 3000, maximumAge: 10000}
         );
      });
   },
   getAreas() {
      return HttpCache.get('http://api.kanttiinit.fi/areas', {days: '1'});
   }
};
