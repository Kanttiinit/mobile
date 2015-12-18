import React from 'react-native';

const {
   AsyncStorage
} = React;

export default {
   addFavorite(name) {
      console.log("add favorite " + name);
   },
   getFavorites() {
      var arr = [{name:'Spagetti'}, {name:'Pizza'}, {name: 'Tortillat'}, {name:'Spagetti2'}, {name:'Pizza2'}, {name: 'Tortillat2'}, {name:'Spagetti3'}, {name:'Pizza3'}, {name: 'Tortillat3'}];
      console.log("returning favs: " + arr);
      return arr;
   }
};
