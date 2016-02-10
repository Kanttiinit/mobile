'use strict';

import React from 'react-native';
import {MKButton, MKColor} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import {updateSelectedRestaurants} from '../../../store/actions';

const {
   View,
   Text
} = React;

class AreaSelector extends React.Component {
   render() {
      const {areas, onSelect} = this.props;
      return (
         <View style={{justifyContent: 'center', flex: 1}}>
            <Text style={{fontSize: 18, textAlign: 'center'}}>Et ole vielä valinnut yhtään ravintolaa!</Text>
            {areas.map(a =>
               <MKButton
                  onPress={() => this.props.updateSelectedRestaurants(a.Restaurants, true)}
                  key={a.id}
                  style={{backgroundColor: MKColor.Teal, padding: 8, margin: 6, marginTop: 0}}>
                  <Text style={{color: 'white', fontSize: 16}}><Icon name="plus-circled" /> {a.name}</Text>
               </MKButton>
            )}
         </View>
      );
   }
}

export default connect(
   undefined,
   dispatch => ({
      updateSelectedRestaurants: (restaurants, areSelected) => dispatch(updateSelectedRestaurants(restaurants, areSelected))
   })
)(AreaSelector);
