'use strict';

import React from 'react-native';
import moment from 'moment';
import Swiper from '../Swiper';
import Loader from '../Loader';
import haversine from 'haversine';
import {connect} from 'react-redux';

import Day from './Menu/Day';
import DaySelector from './Menu/DaySelector';
import AreaSelector from './Menu/AreaSelector';
import {getRestaurants, getAreas, updateLocation} from '../../store/actions';
import {colors} from '../../style';

const {
   View,
   StyleSheet,
   AppState,
   DeviceEventEmitter,
   Text
} = React;

class Menu extends React.Component {
   constructor() {
      super();
   }
   onDaySelectorChange(p) {
      this.refs.swiper.setPage(p);
   }
   onSwiperChange(p) {
      this.refs.daySelector.setCurrent(p);
   }
   render() {
      const {areas, restaurants, days} = this.props;

      if (restaurants && !restaurants.length)
         return <AreaSelector areas={areas} />;

      return (
         <View style={styles.container}>
            {!restaurants ? <Loader color={colors.accent} />
            :
            <Swiper
               ref="swiper"
               onPageChange={this.onSwiperChange.bind(this)}>
               {days.map((date, i) => <Day key={i} date={date} />)}
            </Swiper>
            }
            {restaurants ?
            <DaySelector ref="daySelector" onChange={this.onDaySelectorChange.bind(this)} max={days.length - 1} />
            : null}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.lightGrey,
      flex: 1,
      position: 'relative'
   }
});

export default connect(
   state => ({
      areas: state.areas,
      restaurants: state.restaurants,
      days: state.days
   }),
   dispatch => ({
      updateLocation: () => dispatch(updateLocation()),
      getRestaurants: s => dispatch(getRestaurants(s))
   })
)(Menu);
