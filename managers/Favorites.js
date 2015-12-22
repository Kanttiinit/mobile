import React from 'react-native';

const {
   AsyncStorage
} = React;

const escapeRegExp = str => {
   return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export default {
   getStoredFavorites() {
      return AsyncStorage.getItem('storedFavorites')
      .then(storedFavorites => {
         if (storedFavorites)
            return JSON.parse(storedFavorites);

         return AsyncStorage.setItem('storedFavorites', '[]').then(() => []);
      });
   },
   setStoredFavorites(f) {
      return AsyncStorage.setItem('storedFavorites', JSON.stringify(f));
   },
   addFavorite(name) {
      name = name.toLowerCase();
      return this.getStoredFavorites()
      .then(storedFavorites => {
         if (!storedFavorites.some(f => f.name === name)) {
            storedFavorites.push({name});
            return this.setStoredFavorites(storedFavorites);
         }
      });
   },
   removeFavorite(name) {
      return this.getStoredFavorites()
      .then(storedFavorites => {
         return this.setStoredFavorites(storedFavorites.filter(f => f.name !== name));
      });
   },
   isFavorite(title, favorites) {
      if (title && favorites.length)
         return favorites.some(f => title.toLowerCase().match(escapeRegExp(f.name.toLowerCase())));

      return false;
   },
   formatCourses(courses, favorites) {
      return courses.map(c => {
         c.favorite = this.isFavorite(c.title, favorites);
         return c;
      });
   }
};
