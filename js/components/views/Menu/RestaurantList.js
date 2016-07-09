import React from 'react';
import moment from 'moment';
import momentFI from 'moment/locale/fi';
import {connect} from 'react-redux';
import {colors, spaces, defaultStyles} from '../../../style';
import {formatRestaurants, isToday} from '../../../store/selectors';

import Restaurant from './Restaurant';

import {View, Text, ListView, StyleSheet, Platform} from 'react-native';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const RestaurantList = ({day, isToday, restaurants}) => (
   <View style={{flex: 1}}>
      <View style={styles.daySelector}>
         <Text style={styles.dayTitle}>
            {moment(day).locale('fi').format('dddd').toUpperCase()}
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

const styles = StyleSheet.create({
   daySelector: {
      flexDirection: 'row',
      paddingVertical: spaces.medium,
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
      color: 'rgba(0, 0, 0, 0.4)'
   }
});

const mapState = (state, props) => ({
   currentView: state.misc.currentView,
   now: moment(state.misc.now),
   isToday: isToday(state, props),
   restaurants: formatRestaurants(state, props)
});

export default connect(mapState)(RestaurantList);
