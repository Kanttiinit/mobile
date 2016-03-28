'use strict';

import React from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import Course from './Course';
import {colors, defaultStyles} from '../../../style';

import Button from '../../Button';
import RestaurantDialog from '../Restaurants/RestaurantDialog';
import {showModal} from '../../../store/actions';

const {
   View,
   Text,
   Image,
   StyleSheet,
   Platform
} = React;

export class Restaurant extends React.Component {
   formatOpeningHours() {
      const {restaurant, date} = this.props;
      if (restaurant.hours) {
         const h = restaurant.hours;
         return String(h[0]).substr(0, 2) + ':' + String(h[0]).substr(2) + ' – ' + String(h[1]).substr(0, 2) + ':' + String(h[1]).substr(2);
      }
      return 'suljettu';
   }
   static formatDistance(distance) {
      return distance < 1000 ? distance.toFixed(0) + ' m' : (distance / 1000).toFixed(1) + ' km';
   }
   getColor() {
      return 'hsl(' +
         this.props.restaurant.name.split('')
         .map(_ => _.charCodeAt(0))
         .reduce((code, sum) => sum + code, 0) % 360
      + ', 25%, 95%)';
   }
   getFavString(restaurant) {
      return restaurant.courses.map(c => +c.isFavorite).join('');
   }
   shouldComponentUpdate(props) {
      const result = props.restaurant.id !== this.props.restaurant.id
         || props.restaurant.isOpen !== this.props.restaurant.isOpen
         || props.restaurant.distance !== this.props.restaurant.distance
         || this.getFavString(props.restaurant) !== this.getFavString(this.props.restaurant);

      return result;
   }
   render() {
      const {date, now, restaurant, showModal} = this.props;
      const courses = restaurant.courses;
      const isToday = now.isSame(date, 'day');
      const metaColor = isToday && restaurant.isOpen ? colors.darkAccent : colors.darkGrey;
      return (
         <View style={defaultStyles.card}>

            <Button
               onPress={() => showModal(<RestaurantDialog restaurant={restaurant} />)}
               style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}
               containerStyle={styles.header}>
               <View style={{flex: 1}}>
                  <Text style={[styles.restaurantName, !(isToday && restaurant.isOpen) && {color: colors.darkGrey}]}>{restaurant.name}</Text>
                  <View style={{flex: 1, marginTop: 2, flexDirection: 'row'}}>
                     <Text style={[styles.metaText, {color: metaColor}]}>
                        <Icon size={10} name="android-time" />
                        {' '}
                        {this.formatOpeningHours()}
                     </Text>
                     {restaurant.distance ?
                     <Text style={[styles.metaText, {marginLeft: 8, color: metaColor}]}>
                        <Icon size={10} name="android-pin" />
                        {' '}
                        {Restaurant.formatDistance(restaurant.distance)}
                     </Text>
                     : null}
                  </View>
               </View>
               {restaurant.image ?
               <Image
                  source={{uri: restaurant.image}}
                  resizeMode="contain"
                  style={{width: 48, height: 32, marginRight: 4}} />
               : null}
            </Button>

            {!courses.length ?
            <View style={{padding: 10}}>
               <Text style={styles.emptyMenuText}>Ei menua saatavilla.</Text>
            </View>
            : courses.map((course, i) =>
            <Course
               key={i}
               course={course}
               restaurant={restaurant}
               style={[i > 0 && styles.borderTop]} />
            )}

         </View>
      );
   }
}

export default connect(
   state => ({
      now: state.now
   }),
   dispatch => ({
      showModal: c => dispatch(showModal(c, {padding: 0}))
   })
)(Restaurant);

const styles = StyleSheet.create({
   header: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGrey,
      justifyContent: 'center'
   },
   borderTop: {
      borderTopWidth: 1,
      borderTopColor: colors.lightGrey
   },
   emptyMenuText: {
      color: colors.grey,
      fontSize: 12,
      textAlign: 'center'
   },
   metaText: {
      color: colors.darkGrey,
      fontSize: 11,
      marginVertical: 2,
      opacity: 0.8
   },
   restaurantName: {
      fontSize: 18,
      color: colors.accentDark
   }
});
