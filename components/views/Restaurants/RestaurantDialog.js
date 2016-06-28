import React from 'react';
import MapView from 'react-native-maps';
import geolib from 'geolib';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import haversine from 'haversine';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Restaurant} from '../Menu/Restaurant';
import Button from '../../Button';
import {colors, defaultStyles, spaces} from '../../../style';
import {dismissModal} from '../../../store/actions/modal';

import {
   Platform,
   Linking,
   Image,
   View,
   Text,
   TouchableWithoutFeedback,
   StyleSheet
} from 'react-native';

const dayNumberToDayOfWeek = n => moment().day(n + 1).format('ddd').toUpperCase();

const getOpeningHourString = hours =>
   hours.reduce((open, hour, i) => {
      if (hour) {
         const existingIndex = open.findIndex(_ => _.hour === hour);
         if (existingIndex > -1)
            open[existingIndex].endDay = dayNumberToDayOfWeek(i);
         else
            open.push({startDay: dayNumberToDayOfWeek(i), hour});
      }
      return open;
   }, []);

const Marker = ({color, children, style, coordinate, title, description}) => (
   <MapView.Marker
      title={title}
      anchor={{x: 0.5, y: 1}}
      centerOffset={{x: 0, y: -29 / 2}}
      description={description}
      coordinate={coordinate}>
      <View style={{alignItems: 'center', opacity: 0.8, height: 29}}>
         <View style={[styles.markerViewText, {backgroundColor: color || colors.accent}, style]}>{children}</View>
         <Icon name="md-arrow-dropdown" size={20} style={{marginTop: -8}} color={color || colors.accent} />
      </View>
   </MapView.Marker>
);

class RestaurantDialog extends React.Component {
   panToRestaurant() {
      const {restaurant} = this.props;
      this.refs.map.animateToCoordinate({
         latitude: restaurant.latitude,
         longitude: restaurant.longitude
      });
   }
   getInitialRegion() {
      const {restaurant, location} = this.props;
      const center = location ? geolib.getCenter([restaurant, location]) : restaurant;
      return {
         latitude: Number(center.latitude),
         longitude: Number(center.longitude),
         latitudeDelta: Math.max(2.5 * Math.abs(center.latitude - restaurant.latitude), 0.01),
         longitudeDelta: Math.max(2.5 * Math.abs(center.longitude - restaurant.longitude), 0.01)
      };
   }
   openDirections() {
      const encodedAddress = encodeURIComponent(this.props.restaurant.address);

      if (Platform.OS === 'ios') {
         const googleMapsUri = 'comgooglemaps://?daddr=' + encodedAddress;
         const appleMapsUrl = 'http://maps.apple.com/?daddr=' + encodedAddress;

         Linking.canOpenURL(googleMapsUri)
         .then(supported => {
            if (supported)
               Linking.openURL(googleMapsUri);
            else
               Linking.openURL(appleMapsUrl);
         })
         .catch(err => console.error('An error occurred', err));
      } else {
         Linking.openURL('http://maps.google.com/?daddr=' + encodedAddress)
      }
   }
   render() {
      const {restaurant, location} = this.props;

      return (
         <View>

            <MapView
               ref="map"
               style={{height: 300, borderRadius: 2}}
               rotateEnabled={false}
               showsUserLocation={true}
               initialRegion={this.getInitialRegion()}>
               <Marker
                  coordinate={{
                     latitude: restaurant.latitude,
                     longitude: restaurant.longitude
                  }}
                  color="#469cc6"
                  title={restaurant.name}
                  description={restaurant.address}
                  style={{paddingHorizontal: spaces.small}}>
                  <Icon size={20} color="white" name="md-restaurant" />
               </Marker>
            </MapView>

            <View style={styles.container}>

               <View style={styles.header}>
                  <TouchableWithoutFeedback
                     onPress={this.panToRestaurant.bind(this)}>
                     <View style={{flex: 1}}>
                        <Text style={styles.title}>{restaurant.name}</Text>
                        <Text style={{marginTop: -2, color: colors.grey}}>{restaurant.address}</Text>
                     </View>
                  </TouchableWithoutFeedback>
                  {location &&
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                     <Icon style={styles.distance} name="md-pin" />
                     <Text style={[styles.distance, {marginLeft: 3}]}>{Restaurant.formatDistance(haversine(location, restaurant))}</Text>
                  </View>}
               </View>

               {getOpeningHourString(restaurant.openingHours).map((_, i) =>
               <View key={i} style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: '500', width: 64}}>{_.startDay + (_.endDay ? ' – ' + _.endDay : '')}</Text>
                  <Text style={{color: colors.darkGrey}}>{_.hour}</Text>
               </View>
               )}

               <View style={styles.footer}>
                  <Button
                     onPress={() => Linking.openURL(restaurant.url)}
                     style={[defaultStyles.button, styles.navButton, {marginRight: 10}]}>
                     <Icon name="md-home" size={18} color="white" />
                     <Text style={{color: 'white'}}>{' '}Kotisivut</Text>
                  </Button>
                  {restaurant.address &&
                  <Button
                     onPress={this.openDirections.bind(this)}
                     style={[defaultStyles.button, styles.navButton]}>
                     <Icon name="md-compass" size={18} color="white" />
                     <Text style={{color: 'white'}}>{' '}Reittiohjeet</Text>
                  </Button>}
                  <View style={{flex: 1}} />
                  <Button
                     onPress={() => this.props.dismissModal()}>
                     <Text style={defaultStyles.lightButtonText}>SULJE</Text>
                  </Button>
               </View>

            </View>

         </View>
      );
   }
}

const mapState = state => ({
   location: state.misc.location
});

const mapDispatch = dispatch => bindActionCreators({dismissModal}, dispatch);

export default connect(mapState, mapDispatch)(RestaurantDialog);

const styles = StyleSheet.create({
   container: {
      padding: spaces.medium
   },
   markerViewText: {
      padding: 2,
      borderRadius: spaces.medium
   },
   header: {
      flexDirection: 'row',
      marginBottom: spaces.medium
   },
   title: {
      fontSize: 22,
      color: 'black'
   },
   distance: {
      fontSize: 16,
      color: '#bebebe'
   },
   footer: {
      alignItems: 'flex-end',
      flex: 1,
      marginTop: spaces.medium,
      flexDirection: 'row'
   },
   navButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      padding: spaces.small
   },
   closeButtonText: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold'
   }
});
