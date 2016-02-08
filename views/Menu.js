'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Swiper from '../components/Swiper';
import Service from '../managers/Service';
import Loader from '../components/Loader';
import Favorites from '../managers/Favorites';
import haversine from 'haversine';
import {connect} from 'react-redux';

import Day from './Menu/Day';
import DaySelector from './Menu/DaySelector';
import AreaSelector from './Menu/AreaSelector';
import RestaurantsManager from '../managers/Restaurants';
import {getAreas} from '../store/actions';

const {
   View,
   StyleSheet,
   AppStateIOS,
   Platform,
   DeviceEventEmitter,
   Text
} = React;

const {
   MKColor,
   MKButton
} = Material;

class Menu extends React.Component {
   constructor() {
      super();
      this.state = {
         days: this.getDays(),
         loading: true,
         updating: false,
         areas: []
      };
   }
   closeCourseDialog() {
      this.refs.modal.close();
   }
   getDays() {
      return Array(7).fill(1).map((n, i) => moment().add(i, 'days'));
   }
   componentDidMount() {
      this.props.getAreas();

      if (Platform.OS === 'ios')
         AppStateIOS.addEventListener('change', currentAppState => {
            if (currentAppState === 'active')
               this.update();
         });

      DeviceEventEmitter.addListener('start', this.update.bind(this));
      this.update();
   }
   componentWillReceiveProps(props) {
      if (props.currentView === 'MENU')
         this.update();
   }
   update() {
      // shit is loading yo
      this.setState({updating: true});
      const state = {};

      // update days if first day isn't today
      if (!this.state.days[0].isSame(moment(), 'day'))
         state.days = this.getDays();

      Favorites.getStoredFavorites()
      .then(favorites => {
         state.favorites = favorites;
         return Service.getRestaurants();
      })
      .then(restaurants => {
         state.restaurants = Service.updateRestaurantDistances(restaurants, this.state.location);
         state.loading = false;
         state.updating = false;
         this.setState(state);

         // get location
         return Service.getLocation().then(location => {
            const currentLocation = this.state.location;
            if (!currentLocation || (currentLocation && haversine(currentLocation, location) > 30 / 1000)) {
               this.setState({
                  location,
                  restaurants: Service.updateRestaurantDistances(this.state.restaurants, location)
               });
            }
         });
      })
      .catch(err => console.error(err));
   }
   onDaySelectorChange(p) {
      this.refs.swiper.setPage(p);
   }
   onSwiperChange(p) {
      this.refs.daySelector.setCurrent(p);
   }
   onAreaSelect(area) {
      RestaurantsManager.setSelectedBatch(area.Restaurants, true)
      .then(() => this.update());
   }
   render() {
      const {restaurants, favorites, days, loading, updating} = this.state;
      const {areas} = this.props;

      if (restaurants && !restaurants.length)
         return <AreaSelector areas={areas} onSelect={this.onAreaSelect.bind(this)} />;

      return (
         <View style={styles.container}>
            {loading ? <Loader color={MKColor.Teal} />
            :
            <Swiper
               ref="swiper"
               onPageChange={this.onSwiperChange.bind(this)}>
               {days.map((date, i) => <Day key={i} restaurants={restaurants} favorites={favorites} date={date} />)}
            </Swiper>
            }
            {!loading ?
            <DaySelector ref="daySelector" onChange={this.onDaySelectorChange.bind(this)} max={days.length - 1} />
            : null}
            <View style={[styles.update, updating && {top: 0}]}>
               <Text style={styles.updateText}>Päivitetään...</Text>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: MKColor.Silver,
      flex: 1,
      position: 'relative'
   },
   update: {
      backgroundColor: MKColor.Teal,
      position: 'absolute',
      top: -100,
      left: 0,
      right: 0,
      padding: 8
   },
   updateText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '300'
   }
});

export default connect(
   state => ({
      currentView: state.currentView,
      areas: state.areas
   }),
   dispatch => ({
      getAreas: () => dispatch(getAreas())
   })
)(Menu);
