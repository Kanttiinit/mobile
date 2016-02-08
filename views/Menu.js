'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Swiper from '../components/Swiper';
import Service from '../managers/Service';
import Loader from '../components/Loader';
import haversine from 'haversine';
import {connect} from 'react-redux';

import Day from './Menu/Day';
import DaySelector from './Menu/DaySelector';
import AreaSelector from './Menu/AreaSelector';
import {getRestaurants, getAreas, updateLocation} from '../store/actions';

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
         days: this.getDays()
      };
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
      this.props.updateLocation();
      this.update();
   }
   componentWillReceiveProps(props) {
      // TODO: doesn't work
      const currentLocation = this.props.location;
      const newLocation = props.location;
      if (!currentLocation || (currentLocation && haversine(currentLocation, newLocation) > 30 / 1000)) {
         this.setState({
            restaurants: Service.updateRestaurantDistances(props.restaurants, newLocation)
         });
      }

      if (props.selectedRestaurants && !this.props.selectedRestaurants)
         this.props.getRestaurants(props.selectedRestaurants);
   }
   update() {
      if (!this.state.days[0].isSame(moment(), 'day'))
         this.setState({days: this.getDays()});
   }
   onDaySelectorChange(p) {
      this.refs.swiper.setPage(p);
   }
   onSwiperChange(p) {
      this.refs.daySelector.setCurrent(p);
   }
   render() {
      const {days, loading, updating} = this.state;
      const {restaurants, favorites, areas} = this.props;

      if (restaurants && !restaurants.length)
         return <AreaSelector areas={areas} />;

      return (
         <View style={styles.container}>
            {loading ? <Loader color={MKColor.Teal} />
            :
            <Swiper
               ref="swiper"
               onPageChange={this.onSwiperChange.bind(this)}>
               {days.map((date, i) => <Day key={i} restaurants={restaurants} date={date} />)}
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
      areas: state.areas,
      selectedRestaurants: state.selectedRestaurants,
      location: state.location,
      restaurants: state.restaurants
   }),
   dispatch => ({
      getAreas: () => dispatch(getAreas()),
      getRestaurants: s => dispatch(getRestaurants(s)),
      updateLocation: () => dispatch(updateLocation())
   })
)(Menu);
