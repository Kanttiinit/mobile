import React from 'react-native';

const {
   AsyncStorage
} = React;

export default {
   getStoredFavorites() {
      return AsyncStorage.getItem('storedFavorites')
      .then(storedFavorites => {
         if (storedFavorites)
            return storedFavorites;
         return AsyncStorage.setItem('storedFavorites', '[]');
      })
      .then(s => JSON.parse(s));
   },
   setStoredFavorites(f) {
      return AsyncStorage.setItem('storedFavorites', JSON.stringify(f));
   },
   selectFavorite(f) {
      return this.getSelectedRestaurants()
      .then(selected => {
         selected.push(f);
         return this.setSelectedRestaurants(selected);
      });
   },
   deselectFavorite(f) {
      return this.getSelectedRestaurants()
      .then(selected => {
         selected.splice(selected.indexOf(f), 1);
         return this.setSelectedRestaurants(selected);
      });
   }
};
