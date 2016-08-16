import React from 'react';
import {connect} from 'react-redux';
import {ListView} from 'react-native';

import {formatRestaurants, isToday} from '../store/selectors';
import Restaurant from './RestaurantCourses';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const RestaurantList = ({day, isToday, restaurants}) => (
  <ListView
    style={{backgroundColor: colors.lightGrey}}
    initialListSize={1}
    pageSize={2}
    removeClippedSubviews={false}
    dataSource={dataSource.cloneWithRows(restaurants)}
    renderRow={restaurant =>
      <Restaurant
        day={day}
        restaurant={restaurant}
        courses={restaurant.courses}
        isToday={isToday} />
    } />
);

const mapState = (state, props) => ({
  isToday: isToday(state, props),
  restaurants: formatRestaurants(state, props)
});

export default connect(mapState)(RestaurantList);
