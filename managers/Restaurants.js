'use strict';

import Service from './Service';

import {
   AsyncStorage
} from 'react-native';

export default {
   getSelectedRestaurants() {
      return AsyncStorage.getItem('selectedRestaurants')
      .then(selectedRestaurants => {
         if (selectedRestaurants)
            return JSON.parse(selectedRestaurants);

         return Service.getAreas().then(areas => {
            const restaurantIds = areas[0].Restaurants.map(r => r.id);
            return this.setSelectedRestaurants(restaurantIds).then(() => restaurantIds);
         });
      });
   },
   setSelectedRestaurants(selected) {
      return AsyncStorage.setItem('selectedRestaurants', JSON.stringify(selected));
   },
   selectRestaurant(r) {
      return this.getSelectedRestaurants()
      .then(selected => {
         selected.push(r.id);
         return this.setSelectedRestaurants(selected);
      });
   },
   deselectRestaurant(r) {
      return this.getSelectedRestaurants()
      .then(selected => {
         selected.splice(selected.indexOf(r.id), 1);
         return this.setSelectedRestaurants(selected);
      });
   }
};
