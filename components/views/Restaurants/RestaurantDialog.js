'use strict';

import React from 'react-native';
import MapView from 'react-native-maps';
import geolib from 'geolib';

import {connect} from 'react-redux';

const {
   View,
   Text
} = React;

class RestaurantDialog extends React.Component {
   render() {
      const {restaurant, location} = this.props;
      const center = geolib.getCenter([restaurant, location]);
      return (
         <View>
            <Text style={{fontSize: 22}}>{restaurant.name}</Text>
            <MapView
               style={{height: 300}}
               rotateEnabled={false}
               initialRegion={{
                  latitude: Number(center.latitude),
                  longitude: Number(center.longitude),
                  latitudeDelta: 2.3 * Math.abs(center.latitude - restaurant.latitude),
                  longitudeDelta: 2.3 * Math.abs(center.longitude - restaurant.longitude)
               }}>
               <MapView.Marker
                  coordinate={{
                     latitude: restaurant.latitude,
                     longitude: restaurant.longitude
                  }}/>
               <MapView.Circle
                  radius={10}
                  strokeWidth={10}
                  center={location} />
            </MapView>
         </View>
      );
   }
}

export default connect(
   state => ({
      location: state.location
   })
)(RestaurantDialog);
