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

const {
   View,
   StyleSheet,
   AppStateIOS,
   Platform,
   DeviceEventEmitter
} = React;

const {
   MKColor,
   mdl
} = Material;

class Menu extends React.Component {
   constructor() {
      super();

      this.state = {days: this.getDays()};
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

      if (!this.state.days[0].isSame(moment(), 'day'))
         this.setState({days: this.getDays()});

      // fetch favorites
      Favorites.getStoredFavorites()
      .then(favorites => this.setState({favorites}));

      // update restaurant list
      Service.getRestaurants()
      .then(restaurants => {
         this.setState({
            restaurants: Service.updateRestaurantDistances(restaurants, this.state.location)
         });

         // if no location is known, try to get it
         if (!this.state.location) {
            return Service.getLocation().then(location => {
               this.setState({
                  location,
                  restaurants: Service.updateRestaurantDistances(this.state.restaurants, location)
               });
               this.setState({loading: false});
            });
         } else {
            this.setState({loading: false});
         }
      })
      .catch(err => {
         console.error(err);
      });
   }
   render() {
      const {restaurants, favorites, days, loading} = this.state;
      return (
         <View style={styles.container}>
            {restaurants && favorites
            ? <Swiper>{days.map((date, i) => <Day key={i} restaurants={restaurants} favorites={favorites} date={date} />)}</Swiper>
            : <Loader color={MKColor.Teal} />}
            {restaurants && loading ?
               <mdl.Spinner
                  strokeColor={MKColor.Teal}
                  style={styles.spinner} />
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
      flex: 1
   },
   spinner: {
      position: 'absolute',
      top: 14,
      right: 14,
      transform: [{scale: 0.7}]
   }
});

export default Menu;
