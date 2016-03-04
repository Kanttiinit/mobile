'use strict';

import React from 'react-native';
import MapView from 'react-native-maps';
import geolib from 'geolib';

import Restaurant from '../Menu/Restaurant';
import Button from '../../Button';
import {colors} from '../../../style';
import {dismissModal} from '../../../store/actions';

import {connect} from 'react-redux';

const {
   Image,
   View,
   Text,
   StyleSheet
} = React;

class RestaurantDialog extends React.Component {
   render() {
      const {restaurant, location} = this.props;
      const center = geolib.getCenter([restaurant, location]);
      return (
         <View>
            <View style={styles.header}>
               <Text style={styles.title}>{restaurant.name}</Text>
               <Text style={styles.distance}>{Restaurant.formatDistance(restaurant.distance)}</Text>
            </View>
            <MapView
               style={{height: 300}}
               rotateEnabled={false}
               initialRegion={{
                  latitude: Number(center.latitude),
                  longitude: Number(center.longitude),
                  latitudeDelta: Math.max(2.3 * Math.abs(center.latitude - restaurant.latitude), 0.01),
                  longitudeDelta: Math.max(2.3 * Math.abs(center.longitude - restaurant.longitude), 0.01)
               }}>
               <MapView.Marker
                  coordinate={location}>
                  <View style={styles.userMarker}>
                  </View>
               </MapView.Marker>
               <MapView.Marker
                  coordinate={{
                     latitude: restaurant.latitude,
                     longitude: restaurant.longitude
                  }}>
                  <View>
                     <Image style={styles.restaurantMarker} source={require('../../../assets/img/pin.png')}></Image>
                  </View>
               </MapView.Marker>
            </MapView>
            <Button
               onPress={() => this.props.dismissModal()}
               style={styles.closeButton}>
               <Text style={styles.closeButtonText}>SULJE</Text>
            </Button>
         </View>
      );
   }
}

export default connect(
   state => ({
      location: state.location
   }),
   dispatch => ({
      dismissModal: () => dispatch(dismissModal())
   })
)(RestaurantDialog);

const styles = StyleSheet.create({
   header: {
      flexDirection: 'row',
      marginBottom: 10
   },
   userMarker: {
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: '#469cc6'
   },
   restaurantMarker: {
      width: 120,
      height: 120
   },
   title: {
      flex: 1,
      fontSize: 22
   },
   distance: {
      fontSize: 16,
      color: '#bebebe'
   },
   closeButton: {
      marginTop: 10,
      flex: 0,
      alignSelf: 'flex-end',
      backgroundColor: colors.accent,
      borderRadius: 2,
      padding: 6,
   },
   closeButtonText: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold'
   }
});
