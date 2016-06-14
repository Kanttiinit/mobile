import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {openModal} from '../../../store/actions/modal';
import Course from './Course';
import {colors, defaultStyles} from '../../../style';

import Button from '../../Button';
import RestaurantDialog from '../Restaurants/RestaurantDialog';

import {View, Text, Image, StyleSheet} from 'react-native';

export class Restaurant extends React.Component {
   static formatDistance(distance) {
      return distance < 1 ? (distance * 1000).toFixed(0) + ' m' : (distance).toFixed(1) + ' km';
   }
   getImage() {
      return require(`../../../images/${this.props.restaurant.type}.png`);
   }
   shouldComponentUpdate(props) {
      const result = props.restaurant.id !== this.props.restaurant.id
         || props.restaurant.isOpen !== this.props.restaurant.isOpen
         || props.restaurant.distance !== this.props.restaurant.distance;

      return result;
   }
   render() {
      const {day, now, restaurant, openModal, courses} = this.props;
      const isToday = now.isSame(day, 'day');
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
                        {restaurant.openingHours[moment(day).weekday()] || 'suljettu'}
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

const mapState = (state, props) => ({
   now: state.misc.now,
   courses: _.get(state.menus.menus, [props.restaurant.id, props.day], [])
});

const mapDispatch = dispatch => bindActionCreators({openModal}, dispatch);

export default connect(mapState, mapDispatch)(Restaurant);

const styles = StyleSheet.create({
   header: {
      padding: 8,
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
