'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Swiper from '../components/Swiper';
import Service from '../managers/Service';
import Loader from '../components/Loader';
import Favorites from '../managers/Favorites';
import haversine from 'haversine';

import Modal from 'react-native-simple-modal';
import Day from './Menu/Day';
import CourseDetails from './Menu/CourseDetails';
import DaySelector from './Menu/DaySelector';
import AreaSelector from './Menu/AreaSelector';
import RestaurantsManager from '../managers/Restaurants';

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
   getChildContext() {
      return {
         courseSelected: this.courseSelected.bind(this),
         closeCourseDialog: this.closeCourseDialog.bind(this)
      };
   }
   closeCourseDialog() {
      this.refs.modal.close();
   }
   courseSelected(course, restaurant) {
      this.selectedCourse = course;
      this.selectedCourse.restaurant = restaurant;
      this.refs.modal.open();
   }
   getDays() {
      return Array(7).fill(1).map((n, i) => moment().add(i, 'days'));
   }
   componentDidMount() {
      if (Platform.OS === 'ios')
         AppStateIOS.addEventListener('change', currentAppState => {
            if (currentAppState === 'active')
               this.update();
         });

      DeviceEventEmitter.addListener('start', this.update.bind(this));
      this.props.events.on('MENU', this.update.bind(this));
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

         if (!restaurants.length)
            return Service.getAreas();

         return [];
      })
      .then(areas => {
         state.areas = areas;
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
      const {restaurants, areas, favorites, days, loading, updating} = this.state;

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
            <Modal
               ref="modal"
               style={{padding: 0, backgroundColor: 'transparent'}}
               renderContent={() => React.createElement(CourseDetails, {course: this.selectedCourse})} />
         </View>
      );
   }
}

Menu.childContextTypes = {
   courseSelected: React.PropTypes.func,
   closeCourseDialog: React.PropTypes.func
};

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

export default Menu;
