import React from 'react';
import Checkbox from './reusable/Checkbox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Text, View, StyleSheet, Platform} from 'react-native';

import {isAreaChecked} from '../store/selectors';
import {setSelectedRestaurants} from '../store/actions/restaurants';
import Restaurant from './AreaRestaurant';

const Area = ({isAreaChecked, area, setSelectedRestaurants}) => (
   <View style={defaultStyles.card}>
      <View style={styles.area}>
         <Text style={styles.areaTitle}>{area.name}</Text>
         <Checkbox
            backgroundColor={colors.accentDark}
            color={colors.white}
            checked={isAreaChecked}
            onCheckedChange={checked => setSelectedRestaurants(area.restaurants.map(r => r.id), checked)} />
      </View>
      {area.restaurants.sort((a, b) => a.name > b.name ? 1 : -1).map((r, i) =>
         <Restaurant
            key={r.id}
            restaurant={r}
            style={[styles.restaurant, i > 0 && styles.borderTop]} />
      )}
   </View>
);

const styles = StyleSheet.create({
   area: {
      padding: spaces.small,
      flexDirection: 'row',
      alignItems: 'center'
   },
   areaTitle: {
      fontSize: 20,
      flex: 1,
      fontWeight: '500',
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
   },
   restaurant: {
      marginLeft: spaces.small,
      marginRight: spaces.small,
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
