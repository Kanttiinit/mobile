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
   Component
} = React;

const {
   MKButton,
   MKColor,
   MKCardStyles
} = Material;

class Course extends Component {
   shouldComponentUpdate(nextProps) {
      return nextProps.course.favorite !== this.props.course.favorite;
   }
   render() {
      const {course, restaurant, style} = this.props;
      return (
         <MKButton
            onPress={() => this.context.courseSelected(course, restaurant)}
            rippleColor='rgba(200, 200, 200, 0.25)'
            style={[course.favorite && styles.favoriteCourse]}>
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
      const result = this.getFavString(props.restaurant) !== this.getFavString(this.props.restaurant)
         || props.restaurant.isOpen !== this.props.restaurant.isOpen
         || props.restaurant.distance !== this.props.restaurant.distance;

      return result;
   }
   formatOpeningHours(hours) {
      return String(hours[0]).substr(0, 2) + ':' + String(hours[0]).substr(2) + ' - ' + String(hours[1]).substr(0, 2) + ':' + String(hours[1]).substr(2);
   }
   formatDistance(distance) {
      return distance < 1000 ? distance + ' m' : (distance / 1000).toFixed(1) + ' km';
   }
   render() {
      const {date, courseSelected, restaurant} = this.props;
      const courses = restaurant.courses;
      const isToday = moment().isSame(date, 'day');
      return (
         <View style={[MKCardStyles.card, styles.container]}>

            <View style={[styles.header, restaurant.isOpen && {backgroundColor: MKColor.Teal}]}>
               <View>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  {restaurant.distance ?
                  <Text style={styles.distance}>
                     <Icon name="ios-location" /> {' '} {this.formatDistance(restaurant.distance)}
                  </Text>
                  : null}
               </View>
               <View style={{flex: 1}}>
                  <Text style={[styles.openingHours, restaurant.hours && styles.openingHoursAvailable]}>
                     {restaurant.hours ? this.formatOpeningHours(restaurant.hours) : 'suljettu'}
                  </Text>
               </View>
            </View>

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

const styles = StyleSheet.create({
   container: {
      marginLeft: 14,
      marginRight: 14,
      marginBottom: 14,
      paddingBottom: 0
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#7c7c7c',
      padding: 8
   },
   course: {
      flexDirection: 'row',
      paddingTop: 8,
      paddingBottom: 8,
      alignItems: 'center',
      marginLeft: 8,
      marginRight: 8
   },
   favoriteCourse: {
      backgroundColor: '#f7eaea'
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
      color: MKColor.Silver,
      fontSize: 10,
      paddingTop: 4,
      height: 16
   },
   restaurantName: {
      fontSize: 14,
      color: '#fff'
   }
});
