import Store from 'redux-nimble';

import actions from './actions';
import reducers from './reducers';

import Menu from '../components/views/Menu';
import Favorites from '../components/views/Favorites';
import Restaurants from '../components/views/Restaurants';
import Map from '../components/views/Map';

const defaultState = {
   currentView: 'RUOKALISTA',
   views: [
      { title: 'RUOKALISTA', icon: 'android-restaurant', component: Menu },
      { title: 'SUOSIKIT', icon: 'android-favorite', component: Favorites },
		//{ title: 'KARTTA', icon: 'android-pin', component: Map},
      { title: 'RAVINTOLAT', icon: 'ios-list', component: Restaurants }
   ],
   modal: {
      visible: false,
      component: undefined,
      style: undefined
   },
   selectedFavorites: []
};

export default new Store(reducers, actions, defaultState);
