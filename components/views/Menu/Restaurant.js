import React from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {openModal} from '../../../store/actions/modal';
import Course from './Course';
import {colors, defaultStyles} from '../../../style';

import Button from '../../Button';
import RestaurantDialog from '../Restaurants/RestaurantDialog';

import {
   View,
   Text,
   Image,
   StyleSheet,
   Platform
} from 'react-native';

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
   getImage() {
      const host = this.props.restaurant.url.match(/https?\:\/\/([^\/]+)/)[1];
      switch (host) {
         case 'www.sodexo.fi':
            return require('../../../images/sodexo.png');
         case 'www.teknologforeningen.fi':
            return require('../../../images/taffa.png');
         case 'www.amica.fi':
            return require('../../../images/amica.jpg');
         case 'www.hyyravintolat.fi':
            return require('../../../images/unicafe.png');
      }
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
      const {date, now, restaurant, openModal} = this.props;
      const courses = restaurant.courses;
      const isToday = now.isSame(date, 'day');
      const metaColor = isToday && restaurant.isOpen ? colors.darkAccent : colors.darkGrey;
      return (
         <View style={defaultStyles.card}>

            <Button
               onPress={() => openModal(<RestaurantDialog restaurant={restaurant} />, {padding: 0})}
               style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}
               containerStyle={styles.header}>
               <View style={{flex: 1}}>
                  <Text style={[styles.restaurantName, !(isToday && restaurant.isOpen) && {color: colors.darkGrey}]}>{restaurant.name}</Text>
                  <View style={{flex: 1, marginTop: 2, flexDirection: 'row'}}>
                     <Text style={[styles.metaText, {color: metaColor}]}>
                        <Icon size={10} name="md-time" />
                        {' '}
                        {this.formatOpeningHours()}
                     </Text>
                     {restaurant.distance ?
                     <Text style={[styles.metaText, {marginLeft: 8, color: metaColor}]}>
                        <Icon size={10} name="md-pin" />
                        {' '}
                        {Restaurant.formatDistance(restaurant.distance)}
                     </Text>
                     : null}
                  </View>
               </View>
               {restaurant.image ?
               <Image
                  source={this.getImage()}
                  resizeMode="contain"
                  style={{width: 42, height: 36, marginRight: 4}} />
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

const mapState = state => ({
   now: state.misc.now
});

const mapDispatch = dispatch => bindActionCreators({openModal}, dispatch);

export default connect(mapState, mapDispatch)(Restaurant);

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
