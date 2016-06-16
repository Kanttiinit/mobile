import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Button from '../../Button';
import {colors, defaultStyles} from '../../../style';

import {updateSelectedRestaurants} from '../../../store/actions/restaurants';

import {View, Text} from 'react-native';

const AreaSelector = props => {
   const {areas, updateSelectedRestaurants} = props;

   return (
      <View style={{justifyContent: 'center', flex: 1}}>
         <Text style={{fontSize: 20, textAlign: 'center', padding: 18, marginBottom: 8}}>
            Aloita valitsemalla kampuksesi alta
         </Text>
         {areas.map(a =>
            <Button
               onPress={() => updateSelectedRestaurants(a.restaurants, true)}
               key={a.id}
               style={[defaultStyles.button, {padding: 20, marginVertical: 5, marginHorizontal: 10}]}>
               <Text style={{color: 'white', fontSize: 20}}>{a.name}</Text>
            </Button>
         )}
         <Text style={{fontSize: 12, color: colors.darkGrey, textAlign: 'center', marginTop: 10}}>Voit muuttaa asetuksia myöhemmin "Ravintolat" välilehdestä.</Text>
      </View>
   );
}

const mapState = state => ({
   areas: state.areas.items
});

const mapDispatch = dispatch => bindActionCreators({updateSelectedRestaurants}, dispatch);

export default connect(mapState, mapDispatch)(AreaSelector);
