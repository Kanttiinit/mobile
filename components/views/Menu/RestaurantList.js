import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import momentFI from 'moment/locale/fi';
import {connect} from 'react-redux';
import {colors, defaultStyles} from '../../../style';

import Restaurant from './Restaurant';

import {View, Text, ListView, StyleSheet, Platform} from 'react-native';

moment.locale('fi');
const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class RestaurantList extends React.Component {
   render() {
      const {day, isToday, restaurants} = this.props;
      console.log(restaurants);
      return (
         <View style={{flex: 1}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>
                  {moment(day).format('dddd').toUpperCase()}
                  <Text style={styles.date}> {moment(day).format('D.M.')}</Text>
               </Text>
            </View>
            <ListView
               initialListSize={1}
               pageSize={2}
               dataSource={dataSource.cloneWithRows(restaurants)}
               renderRow={restaurant =>
                  <Restaurant
                     restaurant={restaurant}
                     courses={restaurant.courses}
                     isToday={isToday} />
               } />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   daySelector: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center',
      marginBottom: 0,
      height: 50,
      backgroundColor: 'transparent'
   },
   dayTitle: {
      fontSize: 20,
      fontWeight: '300',
      flexDirection: 'row',
      textAlign: 'center',
      flex: 1,
      color: 'black',
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
   },
   date: {
      color: 'rgba(0, 0, 0, 0.6)'
   }
});

const mapState = (state, props) => ({
   currentView: state.misc.currentView,
   now: moment(state.misc.now),
   isToday: moment(state.misc.now).isSame(moment(props.day), 'day'),
   restaurants: _.orderBy(
      props.restaurants.map(restaurant => {
         const courses = _.get(state.menus.menus, [restaurant.id, props.day], []);
         return {...restaurant, courses, noCourses: !courses.length};
      }),
   ['noCourses'])
});

export default connect(mapState)(RestaurantList);
