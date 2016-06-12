import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Button from '../../Button';
import {colors} from '../../../style';

import {updateSelectedRestaurants} from '../../../store/actions/restaurants';

import {
   View,
   Text
} from 'react-native';

const AreaSelector = props => {
   const {areas, onSelect, updateSelectedRestaurants} = props;
   return (
      <View style={{justifyContent: 'center', flex: 1}}>
         <Text style={{fontSize: 20, textAlign: 'center', padding: 18, marginBottom: 8}}>
            Aloita valitsemalla kampuksesi alta
         </Text>
         {areas.map(a =>
            <Button
               onPress={() => updateSelectedRestaurants(a.Restaurants, true)}
               key={a.id}
               style={{backgroundColor: colors.accent, borderRadius: 4, padding: 18, margin: 8, marginTop: 0}}>
               <Text style={{color: 'white', fontSize: 20}}>{a.name}</Text>
            </Button>
         )}
         <Text style={{fontSize: 12, color: colors.darkGrey, textAlign: 'center', marginTop: 10}}>Voit muuttaa asetuksia myöhemmin "Ravintolat" välilehdestä.</Text>
      </View>
   );
}

const mapDispatch = dispatch => bindActionCreators({updateSelectedRestaurants}, dispatch);

export default connect(null, mapDispatch)(AreaSelector);
