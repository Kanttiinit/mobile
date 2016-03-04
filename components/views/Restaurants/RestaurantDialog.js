'use strict';

import React from 'react-native';
import MapView from 'react-native-maps';
import geolib from 'geolib';
import Icon from 'react-native-vector-icons/Ionicons';

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
         <View style={{padding: 0, margin: 0}}>
            <MapView
               style={{height: 300, padding: 0, margin: 0}}
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
                  <View style={styles.restaurantMarker}>
                     <Icon name='android-restaurant' size={30} color="white" />
                  </View>
               </MapView.Marker>
            </MapView>
            <View style={styles.header}>
               <Text style={styles.title}>{restaurant.name}</Text>
               <Text style={styles.distance}>{Restaurant.formatDistance(restaurant.distance)}</Text>
            </View>
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
      marginBottom: 10,
      marginTop: 10
   },
   userMarker: {
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: '#469cc6',
      borderWidth: 2,
      borderColor: '#79bdde'
   },
   restaurantMarker: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
      borderRadius: 50,
      backgroundColor: '#469cc6',
      borderWidth: 4,
      borderColor: '#469cc6'
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
