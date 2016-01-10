'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Swiper from '../components/Swiper';
import Service from '../managers/Service';
import Loader from '../components/Loader';
import Favorites from '../managers/Favorites';

import Modal from 'react-native-simple-modal';
import Day from './Menu/Day';
import CourseDetails from './Menu/CourseDetails';
import DaySelector from './Menu/DaySelector';

const {
   View,
   StyleSheet,
   AppStateIOS,
   Platform,
   DeviceEventEmitter,
   Text
} = React;

const {
   MKColor
} = Material;

class Menu extends React.Component {
   constructor() {
      super();
      this.state = {
         days: this.getDays()
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
      if (this.state.loading)
         return;

      // shit is loading, yo
      this.setState({loading: true});

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
         this.setState(state);
         this.onSwiperChange(0);

         // if no location is known, try to get it
         if (!this.state.location) {
            return Service.getLocation().then(location => {
               this.setState({
                  location,
                  restaurants: Service.updateRestaurantDistances(this.state.restaurants, location)
               });
            });
         }
      })
      .catch(err => console.error(err));
   }
   onDaySelectorChange(p) {
      this.refs.swiper.setPage(p);
   }
   onSwiperChange(p) {
      this.refs.daySelector.setCurrent(p);
   }
   render() {
      const {restaurants, favorites, days, loading} = this.state;
      return (
         <View style={styles.container}>
            {loading || !restaurants || !favorites
            ? <Loader color={MKColor.Teal} />
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
            <Modal
               ref="modal"
               style={{padding: 0}}
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
   }
});

export default Menu;
