import Menu from '../components/views/Menu';
import Favorites from '../components/views/Favorites';
import Restaurants from '../components/views/Restaurants';

export default {
   currentView: 'MENU',
   views: [
      { title: 'MENU', icon: 'android-restaurant', component: Menu },
      { title: 'SUOSIKIT', icon: 'android-favorite', component: Favorites },
      { title: 'RAVINTOLAT', icon: 'ios-list', component: Restaurants }
   ],
   areas: undefined,
   modal: {
      visible: false,
      component: undefined,
      style: undefined
   },
   favorites: [],
   selectedFavorites: undefined,
   selectedRestaurants: undefined,
   location: undefined,
   restaurants: undefined,
   restaurantsLoading: true,
   menus: undefined,
   now: undefined,
   days: undefined
};
