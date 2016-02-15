'use strict';

import React from 'react-native';
import MapView from 'react-native-maps';

const {
   View,
   Text
} = React;

export default class RestaurantDialog extends React.Component {
   render() {
      const {restaurant} = this.props;
      const coords = {
         latitude: restaurant.latitude,
         longitude: restaurant.longitude
      };
      return (
         <View>
            <Text style={{fontSize: 20}}>{restaurant.name}</Text>
            <MapView
               style={{height: 300}}
               rotateEnabled={false}
               initialRegion={{
                  ...coords,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02
               }}>
               <MapView.Marker
                  coordinate={coords}/>
            </MapView>
         </View>
      );
   }
}
