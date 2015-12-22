'use strict';

import {AsyncStorage} from 'react-native';
import geolib from 'geolib';
import moment from 'moment';
import RestaurantsManager from './Restaurants';
import HttpCache from './HttpCache';
import Favorites from './Favorites';

export default {
   // add distance property to this.data.restaurants if user location is defined
   updateRestaurantDistances(restaurants, location) {
      if (location && location.latitude && location.longitude) {
         return restaurants.map(r => {
            if (r.latitude && r.longitude)
               r.distance = geolib.getDistance(
                  {latitude: location.latitude, longitude: location.longitude},
                  {latitude: r.latitude, longitude: r.longitude}
               );
            return r;
         });
      }

      return restaurants;
   },
   // return restaurants sorted by distance and favorite foods
   sortedRestaurants(restaurants, date) {
      return restaurants.sort((a, b) => {
         // can this be written in a prettier way??
         if (!a.hours && b.hours) return 1;
         if (a.hours && !b.hours) return -1;
         if (!a.courses.length && b.courses.length) return 1;
         if (a.courses.length && !b.courses.length) return -1;
         if (!a.isOpen && b.isOpen) return 1;
         if (a.isOpen && !b.isOpen) return -1;
         if (!a.favoriteCourses && b.favoriteCourses) return 1;
         if (a.favoriteCourses && !b.favoriteCourses) return -1;
         if (a.distance > b.distance) return 1;
         if (a.distance < b.distance) return -1;
         if (a.name > b.name) return 1;
         if (a.name < b.name) return -1;

         return 0;
      });
   },
   getOpeningHours(restaurant, date) {
      const now = Number(moment().format('HHmm'));
      const hours = restaurant.openingHours[date.day() - 1];
      return {hours, isOpen: hours && now >= hours[0] && now < hours[1]};
   },
   formatRestaurants(restaurants, date, favorites) {
      return this.sortedRestaurants(restaurants.map(restaurant => {
         const coursesForDate = (restaurant.Menus.find(m => moment(m.date).isSame(date, 'day')) || {courses: []}).courses;
         const courses = Favorites.formatCourses(coursesForDate, favorites);
         const openingHours = this.getOpeningHours(restaurant, date);
         return {
            ...restaurant,
            hours: openingHours.hours,
            isOpen: openingHours.isOpen,
            courses,
            favoriteCourses: courses.reduce((sum, c) => sum + c.favorite && 1, 0)
         };
      }), date);
   },
   // download restaurants or serve from cache
   getRestaurants() {
      return RestaurantsManager.getSelectedRestaurants()
      .then(selected => HttpCache.get('menus', 'http://api.kanttiinit.fi/menus/' + selected.join(','), {days: 1}));
   },
   // fetch user location
   getLocation() {
      return new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
            position => resolve(position.coords),
            error => resolve(error.message),
            {timeout: 3000, maximumAge: 60000}
         );
      });
   },
   getAreas() {
      return HttpCache.get('areas', 'http://api.kanttiinit.fi/areas', {days: '1'});
   }
};
