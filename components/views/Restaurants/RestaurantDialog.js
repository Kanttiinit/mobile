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

const MarkerView = props =>
   <View style={{alignItems: 'center', opacity: 0.9, paddingBottom: props.offset || 0}}>
      <Text style={[styles.markerViewText, {backgroundColor: props.color || colors.accent}, props.style]}>{props.children}</Text>
      <Icon name="android-arrow-dropdown" size={20} style={{marginTop: -8}} color={props.color || colors.accent} />
   </View>;

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
                  <MarkerView
                     offset={10}
                     color={colors.accentLight}
                     style={{paddingHorizontal: 4}}>
                     <Icon name="android-person" size={20}/>
                  </MarkerView>
               </MapView.Marker>
               <MapView.Marker
                  coordinate={{
                     latitude: restaurant.latitude,
                     longitude: restaurant.longitude
                  }}
                  title={restaurant.name}
                  description={restaurant.address}>
                  <MarkerView
                     offset={20}
                     color={'#469cc6'}
                     style={{paddingHorizontal: 6}}>
                     <Icon size={20} name="android-restaurant" />
                  </MarkerView>
               </MapView.Marker>
            </MapView>
            <View style={styles.container}>
               <View style={styles.header}>
                  <Text style={styles.title}>{restaurant.name}</Text>
                  <Text style={styles.distance}>{Restaurant.formatDistance(restaurant.distance)}</Text>
               </View>
               <View>
                  <Text style={{color: colors.darkGrey}}>{restaurant.openingHourString.join("\n")}</Text>
                  <Text style={{marginTop: 4, color: colors.darkGrey}}>{restaurant.address}</Text>
               </View>
               <View style={styles.footer}>
                  { restaurant.address ?
                     <Button
                        onPress={() => Linking.openURL("http://maps.google.com/?daddr=" + encodeURIComponent(restaurant.address))}
                        style={styles.navButton}>
                        <Icon name="android-open" size={18} color={colors.accentLight} />
                        <Text style={{marginLeft: 6, color: colors.accentLight}}>Reittiohjeet</Text>
                     </Button>
                     : undefined
                  }
                  <View style={{flex: 1}} />
                  <Button
                     onPress={() => this.props.dismissModal()}
                     style={styles.closeButton}>
                     <Text style={styles.closeButtonText}>SULJE</Text>
                  </Button>
               </View>
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
   markerViewText: {
      padding: 2,
      borderRadius: 10,
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold'
   },
   header: {
      flexDirection: 'row',
      marginBottom: 10,
      alignItems: 'center'
   },
   title: {
      flex: 1,
      fontSize: 22,
      fontWeight: '200'
   },
   distance: {
      fontSize: 16,
      color: '#bebebe'
   },
   footer: {
      alignItems: 'center',
      flex: 1,
      marginTop: 10,
      flexDirection: 'row'
   },
   navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start'
   },
   closeButton: {
      alignSelf: 'flex-end',
      backgroundColor: colors.accent,
      borderRadius: 2,
      padding: 6
   },
   closeButtonText: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold'
   }
});
