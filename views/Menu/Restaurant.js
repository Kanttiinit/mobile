'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

import Property from './Property';

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

class Course extends Component {
   shouldComponentUpdate(nextProps) {
      const nextCourse = nextProps.course;
      const currentCourse = this.props.course;
      return nextCourse.title !== currentCourse.title || nextCourse.favorite !== currentCourse.favorite;
   }
   render() {
      const {course, restaurant, style} = this.props;
      return (
         <MKButton
            onPress={() => this.context.courseSelected(course, restaurant)}
            rippleColor='rgba(200, 200, 200, 0.25)'
            style={[course.favorite ? styles.favoriteCourse : {borderRadius: 2}]}>
            <View style={[styles.course, style]}>
               {course.favorite ? <Icon style={{marginRight: 6}} color='#fc5151' name='android-favorite' /> : null}
               <Text key={course.title} style={styles.courseTitle}>{course.title}</Text>
               {course.properties ? course.properties.map(p => <Property style={{marginLeft: 2}} key={p}>{p}</Property>) : null}
            </View>
         </MKButton>
      );
   }
}

Course.contextTypes = {
   courseSelected: React.PropTypes.func
};

export default class Restaurant extends Component {
   getFavString(restaurant) {
      return restaurant.courses.map(c => +c.favorite).join('');
   }
   shouldComponentUpdate(props) {
      const result = props.restaurant.id !== this.props.restaurant.id
         || props.restaurant.isOpen !== this.props.restaurant.isOpen
         || props.restaurant.distance !== this.props.restaurant.distance
         || this.getFavString(props.restaurant) !== this.getFavString(this.props.restaurant);

      return result;
   }
   formatOpeningHours(hours) {
      return String(hours[0]).substr(0, 2) + ':' + String(hours[0]).substr(2) + ' - ' + String(hours[1]).substr(0, 2) + ':' + String(hours[1]).substr(2);
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

            <View style={[styles.header, isToday && restaurant.isOpen && {backgroundColor: MKColor.Teal}]}>
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
                     {restaurant.hours ? this.formatOpeningHours(restaurant.hours) : 'suljettu'}
                  </Text>
               </View>
            </View>

            {!courses.length ?
            <View style={{padding: 10, borderRadius: 2}}>
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