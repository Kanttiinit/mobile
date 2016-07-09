import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Button from '../../reusable/Button';


import {updateSelectedRestaurants} from '../../../store/actions/restaurants';

import {View, Text} from 'react-native';

const AreaSelector = ({areas, updateSelectedRestaurants}) => (
   <View style={{justifyContent: 'center', flex: 1}}>
      <Text style={[defaultStyles.bigText, {textAlign: 'center', padding: spaces.big, marginBottom: spaces.medium}]}>
         Aloita valitsemalla kampuksesi alta
      </Text>
      {areas.map(a =>
         <Button
            key={a.id}
            onPress={() => updateSelectedRestaurants(a.restaurants.map(r => r.id), true)}
            style={[defaultStyles.button, {padding: spaces.big, marginVertical: spaces.small, marginHorizontal: spaces.medium}]}>
            <Text
               style={[defaultStyles.bigText, {color: 'white'}]}>
               {a.name}
            </Text>
         </Button>
      )}
      <Text
         style={[defaultStyles.smallText, {textAlign: 'center', marginTop: spaces.medium}]}>
         Voit muuttaa asetuksia myöhemmin "Ravintolat" välilehdestä.
      </Text>
   </View>
);

const mapState = state => ({
   areas: state.areas.items
});

const mapDispatch = dispatch => bindActionCreators({updateSelectedRestaurants}, dispatch);

export default connect(mapState, mapDispatch)(AreaSelector);
