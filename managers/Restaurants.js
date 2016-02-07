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
            return this.setSelectedRestaurants([]).then(() => []);
         });
      });
   },
   setSelectedRestaurants(selected) {
      return AsyncStorage.setItem('selectedRestaurants', JSON.stringify(selected));
   },
   setSelectedBatch(restaurants, isSelected) {
      return this.getSelectedRestaurants()
      .then(selected => {
         if (isSelected)
            restaurants.forEach(r => selected.push(r.id));
         else
            selected = selected.filter(id => !restaurants.some(r => r.id === id));
         return this.setSelectedRestaurants(selected);
      });
   },
   setSelected(restaurant, isSelected) {
      return this.getSelectedRestaurants()
      .then(selected => {
         if (isSelected)
            selected.push(restaurant.id);
         else
            selected.splice(selected.indexOf(restaurant.id), 1);
         return this.setSelectedRestaurants(selected);
      });
   }
};
