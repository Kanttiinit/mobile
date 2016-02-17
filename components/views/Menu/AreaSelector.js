'use strict';

import React from 'react-native';
import {connect} from 'react-redux';

import {updateSelectedRestaurants} from '../../../store/actions';
import Button from '../../Button';
import {colors} from '../../../style';

const {
   View,
   Text
} = React;

class AreaSelector extends React.Component {
   render() {
      const {areas, onSelect} = this.props;
      return (
         <View style={{justifyContent: 'center', flex: 1}}>
            <Text style={{fontSize: 20, textAlign: 'center', padding: 18, marginBottom: 8}}>
               Aloita valitsemalla kampuksesi alta
            </Text>
            {areas.map(a =>
               <Button
                  onPress={() => this.props.updateSelectedRestaurants(a.Restaurants, true)}
                  key={a.id}
                  style={{backgroundColor: colors.accent, borderRadius: 4, padding: 18, margin: 8, marginTop: 0}}>
                  <Text style={{color: 'white', fontSize: 20}}>{a.name}</Text>
               </Button>
            )}
            <Text style={{fontSize: 12, color: colors.darkGrey, textAlign: 'center', marginTop: 10}}>Voit muuttaa asetuksia myöhemmin "Ravintolat" välilehdestä.</Text>
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
