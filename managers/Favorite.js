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
   addFavorite(f) {
      return this.getStoredFavorites()
      .then(storedFavorites => {
         storedFavorites.push({name: f});
         return this.setStoredFavorites(storedFavorites);
      });
   },
   removeFavorite(f) {
      return this.getStoredFavorites()
      .then(storedFavorites => {
         storedFavorites.splice(storedFavorites.indexOf(f), 1);
         return this.setStoredFavorites(storedFavorites);
      });
   }
};
