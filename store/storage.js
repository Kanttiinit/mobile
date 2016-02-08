'use strict';

import {AsyncStorage} from 'react-native';

export default {
   getList(name) {
      return AsyncStorage.getItem(name)
      .then(list => {
         if (list)
            return JSON.parse(list);

         return this.setList(name, []).then(() => []);
      });
   },
   setList(name, list) {
      AsyncStorage.setItem(name, JSON.stringify(list));
   }
};
