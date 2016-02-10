'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Swiper from '../Swiper';
import Loader from '../Loader';
import haversine from 'haversine';
import {connect} from 'react-redux';

import Day from './Menu/Day';
import DaySelector from './Menu/DaySelector';
import AreaSelector from './Menu/AreaSelector';
import {getRestaurants, getAreas, updateLocation} from '../../store/actions';

const {
   View,
   StyleSheet,
   AppState,
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

      AppState.addEventListener('change', currentAppState => {
         if (currentAppState === 'active')
            this.update();
      });

      this.props.updateLocation();
      this.update();
   }
   componentWillReceiveProps(props) {
      if (props.selectedRestaurants !== this.props.selectedRestaurants)
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
      const {days} = this.state;
      const {restaurants, favorites, areas} = this.props;

      if (restaurants && !restaurants.length)
         return <AreaSelector areas={areas} />;

      return (
         <View style={styles.container}>
            {!restaurants ? <Loader color={MKColor.Teal} />
            :
            <Swiper
               ref="swiper"
               onPageChange={this.onSwiperChange.bind(this)}>
               {days.map((date, i) => <Day key={i} restaurants={restaurants} date={date} />)}
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
      backgroundColor: MKColor.Silver,
      flex: 1,
      position: 'relative'
   }
});

export default connect(
   state => ({
      areas: state.areas,
      selectedRestaurants: state.selectedRestaurants,
      restaurants: state.restaurants
   }),
   dispatch => ({
      getAreas: () => dispatch(getAreas()),
      getRestaurants: s => dispatch(getRestaurants(s)),
      updateLocation: () => dispatch(updateLocation())
   })
)(Menu);
