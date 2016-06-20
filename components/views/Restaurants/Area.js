import React from 'react';
import Checkbox from '../../Checkbox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../store/actions/restaurants';

import Restaurant from './Restaurant';
import {colors, defaultStyles} from '../../../style';

import {Text, View, StyleSheet, Platform} from 'react-native';

class Area extends React.Component {
   checkedChange(restaurants, checked) {
      this.props.updateSelectedRestaurants(restaurants.map(r => r.id), checked);
   }
   areAllChecked() {
      return this.props.area.restaurants.every(r => this.props.selectedRestaurants.indexOf(r.id) > -1);
   }
   render() {
      const {selectedRestaurants, area} = this.props;

      return (
         <View style={defaultStyles.card}>
            <View style={styles.area}>
               <Text style={styles.areaTitle}>{area.name}</Text>
               <Checkbox
                  backgroundColor={colors.accentDark}
                  color="white"
                  checked={this.areAllChecked()}
                  onCheckedChange={this.checkedChange.bind(this, area.restaurants)} />
            </View>
            {area.restaurants.sort((a, b) => a.name > b.name ? 1 : -1).map((r, i) =>
               <Restaurant
                  key={r.id}
                  restaurant={r}
                  style={[styles.restaurant, i > 0 && styles.borderTop]} />
            )}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   area: {
      padding: 6,
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
      marginLeft: 6,
      marginRight: 6,
      flexDirection: 'row',
      alignItems: 'center'
   },
   borderTop: {
      borderTopWidth: 1,
      borderTopColor: colors.lightGrey
   }
});

const mapState = state => ({
   selectedRestaurants: state.restaurants.selected
});

const mapDispatch = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapState, mapDispatch)(Area);
