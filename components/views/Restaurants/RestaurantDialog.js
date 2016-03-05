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
   Linking,
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
               style={{height: 300, padding: 0, margin: 0, borderRadius: 2}}
               rotateEnabled={false}
               initialRegion={{
                  latitude: Number(center.latitude),
                  longitude: Number(center.longitude),
                  latitudeDelta: Math.max(2.5 * Math.abs(center.latitude - restaurant.latitude), 0.01),
                  longitudeDelta: Math.max(2.5 * Math.abs(center.longitude - restaurant.longitude), 0.01)
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
            <View style={styles.container}>
               <View style={styles.header}>
                  <Text style={styles.title}>{restaurant.name}</Text>
                  <Text style={styles.distance}>{Restaurant.formatDistance(restaurant.distance)}</Text>
               </View>
               <View>
                  <Text>{restaurant.openingHourString.join("\n")}</Text>
                  <Text style={{marginTop: 4}}>{restaurant.address}</Text>
               </View>
               {restaurant.address ?
               <Button
                  onPress={() => Linking.openURL("http://maps.google.com/?daddr=" + encodeURIComponent(restaurant.address))}
                  style={styles.navButton}>
                  <Icon name="android-open" size={18} color={colors.accentLight} />
                  <Text style={{marginLeft: 6, color: colors.accentLight}}>Reittiohjeet</Text>
               </Button>
               : null}
               <Button
                  onPress={() => this.props.dismissModal()}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>SULJE</Text>
               </Button>
            </View>
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
   container: {
      padding: 10
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
   header: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center'
   },
   title: {
      flex: 1,
      fontSize: 22
   },
   distance: {
      fontSize: 16,
      color: '#bebebe'
   },
   navButton: {
      marginTop: 6,
      flex: 0,
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center'
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
