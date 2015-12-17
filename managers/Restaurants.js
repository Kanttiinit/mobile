'use strict';

import {
   AsyncStorage
} from 'react-native';

export default {
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
