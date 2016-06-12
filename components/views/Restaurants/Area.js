import React from 'react';
import Checkbox from '../../Checkbox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../../store/actions/restaurants';

import Restaurant from './Restaurant';
import {colors, defaultStyles} from '../../../style';

import {
   Text,
   View,
   StyleSheet,
   Platform
} from 'react-native';

class Area extends React.Component {
   constructor() {
      super();
      this.state = {};
   }
   checkedChange(restaurants, checked) {
      this.props.updateSelectedRestaurants(restaurants, checked);
   }
   areAllChecked() {
      return this.props.area.Restaurants.every(r => this.props.selectedRestaurants.indexOf(r.id) > -1);
   }
   shouldComponentUpdate(props) {
      const getSelectedRestaurantString = props =>
         props.selectedRestaurants.filter(_ => props.area.Restaurants.some(r => r.id === _)).join(',');

      if (props.selectedRestaurants && this.props.selectedRestaurants)
         return getSelectedRestaurantString(this.props) !== getSelectedRestaurantString(props);

      return true;
   }
   render() {
      const {selectedRestaurants, area} = this.props;

      if (selectedRestaurants)
         return (
            <View style={defaultStyles.card}>
               <View style={styles.area}>
                  <Text style={styles.areaTitle}>{area.name}</Text>
                  <Checkbox
                     backgroundColor={colors.accentDark}
                     color="white"
                     checked={this.areAllChecked()}
                     onCheckedChange={this.checkedChange.bind(this, area.Restaurants)} />
               </View>
               {area.Restaurants.sort((a, b) => a.name > b.name ? 1 : -1).map((r, i) =>
                  <Restaurant
                     key={r.id}
                     restaurant={r}
                     checked={!!selectedRestaurants.find(id => id === r.id)}
                     style={[styles.restaurant, i > 0 && styles.borderTop]}
                     checkedChange={this.checkedChange.bind(this)} />
               )}
            </View>
         );

      return <View />;
   }
}

const styles = StyleSheet.create({
   area: {
      padding: 6,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGrey
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
