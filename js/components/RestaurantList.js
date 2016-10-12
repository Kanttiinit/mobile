// @flow
import React from 'react';
import {connect} from 'react-redux';
import {ListView} from 'react-native';

import {formatRestaurants, isToday, selectLang} from '../store/selectors';
import Restaurant from './RestaurantCourses';
import {colors} from '../utils/style';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const RestaurantList = ({day, isToday, restaurants, lang}) => (
  <ListView
    style={{backgroundColor: colors.lightGrey}}
    initialListSize={2}
    pageSize={2}
    removeClippedSubviews={false}
    dataSource={dataSource.cloneWithRows(restaurants)}
    renderRow={restaurant =>
      <Restaurant
        day={day}
        restaurant={restaurant}
        courses={restaurant.courses}
        isToday={isToday}
        lang={lang} />
    } />
);

const mapState = (state, props) => ({
  isToday: isToday(state, props),
  restaurants: formatRestaurants(state, props),
  lang: selectLang(state)
});

export default connect(mapState)(RestaurantList);
