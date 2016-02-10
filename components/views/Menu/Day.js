'use strict';

import React from 'react-native';
import moment from 'moment';
import momentFI from 'moment/locale/fi';
import {connect} from 'react-redux';

import Restaurant from './Restaurant';

const {
   View,
   Text,
   ListView,
   Component,
   Platform,
   StyleSheet
} = React;

class Day extends Component {
   constructor() {
      super();
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      moment.locale('fi');
      this.state = {
         restaurants: []
      };
   }
   componentDidMount() {
      this.update(this.props);
   }
   componentWillReceiveProps(nextProps) {
      this.update(nextProps);
   }
   getOpeningHours(restaurant, date) {
      const now = Number(moment().format('HHmm'));
      const hours = restaurant.openingHours[date.day() - 1];
      return {hours, isOpen: hours && now >= hours[0] && now < hours[1]};
   }
   sortedRestaurants(restaurants, date) {
      const isToday = moment().isSame(date, 'day');
      return restaurants.sort((a, b) => {
         // can this be written in a prettier way??
         if (!a.hours && b.hours) return 1;
         if (a.hours && !b.hours) return -1;
         if (!a.courses.length && b.courses.length) return 1;
         if (a.courses.length && !b.courses.length) return -1;
         if (isToday) {
            if (!a.isOpen && b.isOpen) return 1;
            if (a.isOpen && !b.isOpen) return -1;
         }
         if (!a.favoriteCourses && b.favoriteCourses) return 1;
         if (a.favoriteCourses && !b.favoriteCourses) return -1;
         if (a.distance > b.distance) return 1;
         if (a.distance < b.distance) return -1;
         if (a.name > b.name) return 1;
         if (a.name < b.name) return -1;

         return 0;
      });
   }
   getSortedRestaurants() {
      const {restaurants, date} = this.props;
      return this.sortedRestaurants(restaurants.map(restaurant => {
         const courses = (restaurant.Menus.find(m => moment(m.date).isSame(date, 'day')) || {courses: []}).courses;
         const openingHours = this.getOpeningHours(restaurant, date);
         return {
            ...restaurant,
            hours: openingHours.hours,
            isOpen: openingHours.isOpen,
            courses
         };
      }), date);
   }
   update(props) {
      this.setState({
         restaurants: this.getSortedRestaurants()
      });
   }
   shouldComponentUpdate(nextProps) {
      return true;
   }
   render() {
      const {date, favorites} = this.props;
      const {restaurants, currentPage} = this.state;
      return (
         <View style={{flex: 1}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>
                  {date.format('dddd').toUpperCase()}
                  <Text style={styles.date}> {date.format('DD.MM.')}</Text>
               </Text>
            </View>
            <ListView
               initialListSize={1}
               pageSize={2}
               dataSource={this.dataSource.cloneWithRows(restaurants)}
               renderRow={restaurant =>
                  <Restaurant date={date} restaurant={restaurant} />} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   daySelector: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center'
   },
   dayTitle: {
      fontSize: 18,
      fontWeight: '300',
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
      flexDirection: 'row',
      textAlign: 'center',
      flex: 1
   },
   date: {
      color: '#bababa'
   }
});

export default connect(
   state => ({
      favorites: state.favorites
   })
)(Day);
