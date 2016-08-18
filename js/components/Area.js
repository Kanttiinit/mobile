// @flow
import React from 'react';
import Checkbox from './reusable/Checkbox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Text, View, StyleSheet} from 'react-native';
import sortBy from 'lodash/sortBy';

import {isAreaChecked} from '../store/selectors';
import {setSelectedRestaurants} from '../store/actions/preferences';
import Restaurant from './AreaRestaurant';
import {colors, spaces} from '../utils/style';

const Area = ({isAreaChecked, area, setSelectedRestaurants}) => (
  <View style={{marginBottom: spaces.medium}}>
    <View style={styles.area}>
      <Text style={styles.areaTitle}>{area.name}</Text>
      <Checkbox
        backgroundColor={colors.accentDark}
        color={colors.white}
        checked={isAreaChecked}
        onCheckedChange={checked => setSelectedRestaurants(area.restaurants.map(r => r.id), checked)} />
    </View>
    {sortBy(area.restaurants, 'name').map((r, i) =>
      <Restaurant
        key={r.id}
        restaurant={r}
        style={[styles.restaurant, i > 0 && styles.borderTop]} />
    )}
  </View>
);

const styles = StyleSheet.create({
  area: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  areaTitle: {
    flex: 1,
    color: colors.darkGrey
  },
  restaurant: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey
  }
});

const mapState = (state, props) => ({
  isAreaChecked: isAreaChecked(state, props)
});

const mapDispatch = dispatch => bindActionCreators({setSelectedRestaurants}, dispatch);

export default connect(mapState, mapDispatch)(Area);
