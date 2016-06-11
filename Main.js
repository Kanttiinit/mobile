import React from 'react-native';
import {Provider} from 'react-redux';
import Router from './Router';
import codePush from 'react-native-code-push';

import store from './store';
import HttpCache from './store/HttpCache';
import storage from './store/storage';

const {AppState} = React;

class Main extends React.Component {
   componentWillMount() {
      return;
      AppState.addEventListener('change', currentAppState => {
         if (currentAppState === 'active') {
            codePush.sync({installMode: codePush.InstallMode.ON_NEXT_RESUME});
            this.refresh();
            this.startAutoUpdate();
         } else if (currentAppState === 'background' && this.updateInterval) {
            this.stopAutoUpdate();
         }
      });

      // populate selected restaurants and favorites
      storage.getList('selectedRestaurants').then(_ => store.setSelectedRestaurants(_));
      storage.getList('selectedFavorites').then(_ => store.setSelectedFavorites(_));

      // get areas
      store.getAreas();

      // update restaurants if selected restaurants have changed
      store.subscribe('selectedRestaurants', state => {
         HttpCache.reset('menus');
         if (state.selectedRestaurants)
            store.getRestaurants(state.selectedRestaurants);
      });

      this.refresh();
      this.startAutoUpdate();
   }
   componentWillUnmount() {
      this.stopAutoUpdate();
   }
   startAutoUpdate() {
      if (!this.updateInterval)
         this.updateInterval = setInterval(() => this.refresh(), 15000);
   }
   stopAutoUpdate() {
      clearInterval(this.updateInterval);
      this.updateInterval = undefined;
   }
   refresh() {
      store.updateNow();
      store.updateLocation();
   }
   render() {
      return (
         <Provider store={store}>
            <Router />
         </Provider>
      );
   };
}

React.AppRegistry.registerComponent('kanttiinit', () => Main);
