import {AsyncStorage} from 'react-native';

export default {
   addOrRemoveItemsFromList(listName, deltaItems, include) {
      return this.getList(listName)
      .then(items => {
         if (include)
            items = items.concat(deltaItems);
         else
            items = items.filter(i => !deltaItems.some(j => i === j));

         return this.setList(listName, items).then(() => items);
      });
   },
   addToList(listName, items) {
      return this.addOrRemoveItemsFromList(listName, items, true);
   },
   removeFromList(listName, items) {
      return this.addOrRemoveItemsFromList(listName, items, false);
   },
   getList(name) {
      return AsyncStorage.getItem(name)
      .then(list => {
         if (list)
            return JSON.parse(list);

         return this.setList(name, []).then(() => []);
      });
   },
   setList(name, list) {
      return AsyncStorage.setItem(name, JSON.stringify(list));
   }
};
