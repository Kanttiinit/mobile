'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import {showModal} from '../../../store/actions';

import Property from './Property';
import CourseDetails from './CourseDetails';

const {
   View,
   Text,
   StyleSheet,
   Component,
   Platform
} = React;

const {
   MKButton,
   MKColor,
   MKCardStyles
} = Material;

const escapeRegExp = str => {
   return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

class Course extends Component {
   static isFavorite(course, favorites) {
      if (course.title)
         return favorites.some(f => course.title.toLowerCase().match(escapeRegExp(f.name.toLowerCase())));

      return false;
   }
   render() {
      const {course, restaurant, style, favorites} = this.props;
      course.restaurant = restaurant;
      const isFavorite = Course.isFavorite(course, favorites);
      return (
         <MKButton
            onPress={() => this.props.courseSelected(course, restaurant)}
            rippleColor='rgba(200, 200, 200, 0.25)'
            style={[isFavorite ? styles.favoriteCourse : {borderRadius: 2}]}>
            <View style={[styles.course, style]}>
               {isFavorite ? <Icon style={{marginRight: 6}} color='#fc5151' name='android-favorite' /> : null}
               <Text key={course.title} style={styles.courseTitle}>{course.title}</Text>
               {course.properties ? course.properties.map(p => <Property style={{marginLeft: 2}} key={p}>{p}</Property>) : null}
            </View>
         </MKButton>
      );
   }
}

const CourseContainer = connect(
   state => ({
      favorites: state.favorites
   }),
   dispatch => ({
      courseSelected: course => dispatch(showModal(<CourseDetails course={course} />))
   })
)(Course);

export default class Restaurant extends Component {
   static getOpeningHours(restaurant, date) {
      const now = Number(moment().format('HHmm'));
      const hours = restaurant.openingHours[date.day() - 1];
      return {hours, isOpen: hours && now >= hours[0] && now < hours[1]};
   }
   formatOpeningHours() {
      const {restaurant, date} = this.props;
      if (restaurant.hours) {
         const hours = Restaurant.getOpeningHours(restaurant, date).hours;
         return String(hours[0]).substr(0, 2) + ':' + String(hours[0]).substr(2) + ' - ' + String(hours[1]).substr(0, 2) + ':' + String(hours[1]).substr(2);
      }
      return 'suljettu';
   }
   formatDistance(distance) {
      return distance < 1000 ? distance.toFixed(0) + ' m' : (distance / 1000).toFixed(1) + ' km';
   }
   render() {
      const {date, courseSelected, restaurant} = this.props;
      const courses = restaurant.courses;
      const isToday = moment().isSame(date, 'day');
      return (
         <View style={[MKCardStyles.card, styles.container]}>

            <View style={[styles.header, isToday && Restaurant.getOpeningHours(restaurant, date).isOpen && {backgroundColor: MKColor.Teal}]}>
               <View>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  {restaurant.distance ?
                  <View style={styles.distance}>
                     <Icon style={styles.distanceText} name="ios-location" />
                     <Text style={[styles.distanceText, {marginLeft: 3}]}>{this.formatDistance(restaurant.distance)}</Text>
                  </View>
                  : null}
               </View>
               <View style={{flex: 1}}>
                  <Text style={[styles.openingHours, restaurant.hours && styles.openingHoursAvailable]}>
                     {this.formatOpeningHours()}
                  </Text>
               </View>
            </View>

            {!courses.length ?
            <View style={{padding: 10, borderRadius: 2}}>
               <Text style={styles.emptyMenuText}>Ei menua saatavilla.</Text>
            </View>
            : courses.map((course, i) =>
            <CourseContainer
               key={i}
               course={course}
               restaurant={restaurant}
               style={[i > 0 && styles.borderTop]} />
            )}

         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      borderWidth: 0,
      marginLeft: 14,
      marginRight: 14,
      marginBottom: 14,
      paddingBottom: 0,
      elevation: 2,
      borderRadius: 2
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#7c7c7c',
      padding: 6,
      borderRadius: 2,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
   },
   course: {
      flexDirection: 'row',
      paddingTop: 8,
      paddingBottom: 8,
      alignItems: 'center',
      marginLeft: 8,
      marginRight: 8,
      borderRadius: Platform.OS === 'ios' ? 2 : 0
   },
   favoriteCourse: {
      backgroundColor: '#f7eaea',
      borderRadius: 0
   },
   courseTitle: {
      flex: 1,
      fontSize: 12
   },
   borderTop: {
      borderTopWidth: 1,
      borderTopColor: '#eee'
   },
   emptyMenuText: {
      color: MKColor.Grey,
      fontSize: 12,
      textAlign: 'center'
   },
   openingHours: {
      textAlign: 'right',
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: 12
   },
   openingHoursAvailable: {
      color: '#fff'
   },
   distance: {
      flexDirection: 'row',
      height: 16,
      alignItems: 'center'
   },
   distanceText: {
      color: MKColor.Silver,
      fontSize: 10
   },
   restaurantName: {
      fontSize: 14,
      color: '#fff'
   }
});
