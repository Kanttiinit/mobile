import React from 'react-native';

const {
   AsyncStorage
} = React;

export default {
   addFavorite(name) {
      console.log("add favorite " + name);
   },
   getFavorites() {
      var arr = [{name:'SPAGETTIJAVA'}, {name:'TORTILLAC++'}];
      console.log("returning favs: " + arr);
      return arr;
   }
};
