import '../style';
import React from 'react';
import {bindActionCreators} from 'redux';
import {Provider} from 'react-redux';
import Router from './Router';
import codePush from 'react-native-code-push';
import {AppState, AppRegistry, Platform, StatusBar, Keyboard} from 'react-native';

import store from '../store';
import {fetchSelectedFavorites, fetchFavorites} from '../store/actions/favorites';
import {fetchSelectedRestaurants, fetchRestaurants, fetchFavoritedRestaurants} from '../store/actions/restaurants';
import {fetchAreas} from '../store/actions/areas';
import {updateNow, updateLocation, setKeyboardVisible} from '../store/actions/misc';

const actions = bindActionCreators({
   fetchSelectedFavorites,
   fetchSelectedRestaurants,
   fetchRestaurants,
   fetchAreas,
   updateNow,
   updateLocation,
   setKeyboardVisible,
   fetchFavorites,
   fetchFavoritedRestaurants
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

      actions.fetchSelectedRestaurants();
      actions.fetchFavoritedRestaurants();
      actions.fetchSelectedFavorites();
      actions.fetchFavorites();
      actions.fetchRestaurants();
      actions.fetchAreas();

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
