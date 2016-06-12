import React from 'react';
import {Provider} from 'react-redux';
import Router from './Router';
import codePush from 'react-native-code-push';

import store from './store';
import HttpCache from './store/HttpCache';
import storage from './store/storage';

import {fetchSelectedFavorites} from './store/actions/favorites';
import {updateSelectedRestaurants, fetchRestaurants} from './store/actions/restaurants';
import {fetchAreas} from './store/actions/areas';
import {updateNow, updateLocation} from './store/actions/misc';

import {AppState, AppRegistry} from 'react-native';

class Main extends React.Component {
   componentWillMount() {
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
      storage.getList('selectedRestaurants').then(_ => store.dispatch(updateSelectedRestaurants(_)));
      store.dispatch(fetchSelectedFavorites());

      // get areas
      store.dispatch(fetchAreas());

      // update restaurants if selected restaurants have changed
      // store.subscribe('selectedRestaurants', state => {
      //    HttpCache.reset('menus');
      //    if (state.selectedRestaurants)
      //       store.getRestaurants(state.selectedRestaurants);
      // });

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
      store.dispatch(updateNow());
      store.dispatch(updateLocation());
   }
   render() {
      return (
         <Provider store={store}>
            <Router />
         </Provider>
      );
   };
}

AppRegistry.registerComponent('kanttiinit', () => Main);
