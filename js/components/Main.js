import '../utils/style';
import React from 'react';
import {bindActionCreators} from 'redux';
import {Provider} from 'react-redux';
import Router from './Router';
import codePush from 'react-native-code-push';
import {AsyncStorage, AppState, AppRegistry, Platform, StatusBar, Keyboard} from 'react-native';
import {persistStore} from 'redux-persist';

import store from '../store';
import {fetchFavorites} from '../store/actions/favorites';
import {fetchRestaurants} from '../store/actions/restaurants';
import {fetchAreas} from '../store/actions/areas';
import {fetchMenus} from '../store/actions/menus';
import {updateNow, updateLocation, setKeyboardVisible, setInitializing} from '../store/actions/misc';

const actions = bindActionCreators({
   fetchRestaurants,
   fetchAreas,
   updateNow,
   updateLocation,
   setKeyboardVisible,
   fetchFavorites,
   fetchMenus,
   setInitializing
}, store.dispatch);

class Main extends React.Component {
   componentWillMount() {
      if (Platform.OS === 'ios')
         StatusBar.setBarStyle('light-content');

      Keyboard.addListener('keyboardDidShow', () => {
         actions.setKeyboardVisible(true);
      });
      Keyboard.addListener('keyboardDidHide', () => {
         actions.setKeyboardVisible(false);
      });

      AppState.addEventListener('change', currentAppState => {
         if (currentAppState === 'active') {
            codePush.sync({installMode: codePush.InstallMode.ON_NEXT_RESUME});
            this.refresh();
            this.startAutoUpdate();
         } else if (currentAppState === 'background' && this.updateInterval) {
            this.stopAutoUpdate();
         }
      });

      actions.fetchFavorites();
      actions.fetchRestaurants();
      actions.fetchAreas();

      persistStore(store, {
         whitelist: ['favorites', 'restaurants'],
         storage: AsyncStorage
      }, () => {
         actions.fetchMenus(store.getState().restaurants.selected);
         actions.setInitializing(false);
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
      actions.updateNow();
      actions.updateLocation();
   }
   render() {
      return <Provider store={store}><Router /></Provider>;
   };
}

AppRegistry.registerComponent('kanttiinit', () => Main);
