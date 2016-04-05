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
   componentWillReceiveProps(props) {
      if (this.props.viewChanges !== props.viewChanges && props.currentView === 'RUOKALISTA' && this.props.currentView === 'RUOKALISTA' && this.refs.swiper)
         this.refs.swiper.setPage(0);
   }
   shouldComponentUpdate(props) {
      return props.currentView === 'RUOKALISTA';
   }
   render() {
      const {areas, restaurants, days, restaurantsLoading} = this.props;

      return (
         <View style={styles.container}>
            {!restaurants || !areas ?
            <Loader color={colors.accent} />
            : !restaurants.length ?
            <AreaSelector areas={areas} />
            :
            <Swiper
               ref="swiper"
               onPageChange={this.onSwiperChange.bind(this)}>
               {days.map((date, i) => <Day key={i} date={date} />)}
            </Swiper>
            }

            {restaurants && restaurants.length ?
            <DaySelector ref="daySelector" onChange={this.onDaySelectorChange.bind(this)} max={days.length - 1} />
            : null}

            {restaurantsLoading ?
            <View style={{position: 'absolute', alignItems: 'center', padding: 8, top: 0, left: 0, right: 0, backgroundColor: colors.accent}}>
               <Text style={{color: 'white'}}>Päivitetään...</Text>
            </View>
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
      days: state.days,
      restaurantsLoading: state.restaurantsLoading,
      viewChanges: state.viewChanges,
      currentView: state.currentView
   }),
   dispatch => ({
      updateLocation: () => dispatch(updateLocation()),
      getRestaurants: s => dispatch(getRestaurants(s))
   })
)(Menu);
