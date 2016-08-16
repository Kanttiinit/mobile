import React from 'react';
import MapView from 'react-native-maps';
import geolib from 'geolib';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import haversine from 'haversine';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Color from 'color-js';
import {Platform, Linking, View, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';

import {Restaurant} from './RestaurantCourses';
import Button from './reusable/Button';
import {dismissModal} from '../store/actions/modal';
import {setFavoritedRestaurants} from '../store/actions/preferences';
import {isRestaurantFavorited, selectLang} from '../store/selectors';

const dayNumberToDayOfWeek = (n, lang) => moment().locale(lang).day(n + 1).format('ddd').toUpperCase();

function getOpeningHourString(hours, lang) {
  return hours.reduce((open, hour, i) => {
    if (hour) {
      const existingIndex = open.findIndex(_ => _.hour === hour);
      if (existingIndex > -1)
        open[existingIndex].endDay = dayNumberToDayOfWeek(i, lang);
      else
        open.push({startDay: dayNumberToDayOfWeek(i, lang), hour});
    }
    return open;
  }, []);
}

function getInitialRegion(restaurant, location) {
  const center = location ? geolib.getCenter([restaurant, location]) : restaurant;
  return {
    latitude: Number(center.latitude),
    longitude: Number(center.longitude),
    latitudeDelta: Math.max(2.5 * Math.abs(center.latitude - restaurant.latitude), 0.01),
    longitudeDelta: Math.max(2.5 * Math.abs(center.longitude - restaurant.longitude), 0.01)
  };
}

function openDirections(address) {
  const encodedAddress = encodeURIComponent(address);

  if (Platform.OS === 'ios') {
    const googleMapsUri = 'comgooglemaps://?daddr=' + encodedAddress;
    const appleMapsUrl = 'http://maps.apple.com/?daddr=' + encodedAddress;

    Linking.canOpenURL(googleMapsUri)
    .then(supported => {
      Linking.openURL(supported ? googleMapsUri : appleMapsUrl);
    })
    .catch(err => console.error('An error occurred', err));
  } else {
    Linking.openURL('http://maps.google.com/?daddr=' + encodedAddress);
  }
}

const RestaurantDialog = ({lang, restaurant, isFavorited, location, dismissModal, setFavoritedRestaurants}) => (
  <View>

    <View>
      <MapView
        ref={c => this.map = c}
        style={{height: 300, borderRadius: 2}}
        rotateEnabled={false}
        showsUserLocation={true}
        initialRegion={getInitialRegion(restaurant, location)}>
        <MapView.Marker
          title={restaurant.name}
          description={restaurant.address}
          pinColor={colors.accent}
          coordinate={{
            latitude: restaurant.latitude,
            longitude: restaurant.longitude
          }} />
      </MapView>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => this.map.animateToCoordinate({
            latitude: restaurant.latitude,
            longitude: restaurant.longitude
          })}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Text style={[defaultStyles.bigText, {color: colors.white}]}>{restaurant.name}</Text>
              <Text style={[defaultStyles.smallText, {color: colors.white, opacity: 0.8}]}>
                <Icon name="md-pin" />{' '}
                {restaurant.address + ' '}
                {location &&
                  <Text>
                    {' '}<Icon name="md-walk" />{' '}
                    {Restaurant.formatDistance(haversine(location, restaurant))}
                  </Text>}
              </Text>
            </View>
            <Button onPress={() => setFavoritedRestaurants([restaurant.id], !isFavorited)}>
              <Icon
                name={'md-star' + (!isFavorited ? '-outline' : '')}
                color={isFavorited ? colors.yellow : colors.grey}
                size={24} />
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>

    <View style={styles.container}>

      {getOpeningHourString(restaurant.openingHours, lang).map((_, i) =>
        <View key={i} style={{flexDirection: 'row'}}>
          <Text style={{fontWeight: '500', width: 64}}>{_.startDay + (_.endDay ? ' – ' + _.endDay : '')}</Text>
          <Text style={{color: colors.almostBlack}}>{_.hour}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Button
          onPress={() => Linking.openURL(restaurant.url)}
          style={{marginRight: spaces.medium}}>
          <Text style={defaultStyles.lightButtonText}>
            <Icon name="md-home" />{' ' + translations.homepage[lang].toUpperCase()}
          </Text>
        </Button>
        {restaurant.address &&
          <Button
            onPress={() => openDirections(restaurant.address)}>
            <Text style={defaultStyles.lightButtonText}>
              <Icon name="md-compass" />{' ' + translations.directions[lang].toUpperCase()}
            </Text>
          </Button>}
        <View style={{flex: 1}} />
        <Button
          onPress={() => dismissModal()}>
          <Text style={defaultStyles.lightButtonText}>{translations.close[lang].toUpperCase()}</Text>
        </Button>
      </View>

    </View>
  </View>
);

RestaurantDialog.displayName = 'RestaurantDialog';

const mapState = (state, props) => ({
  location: state.data.location,
  isFavorited: isRestaurantFavorited(state, props),
  lang: selectLang(state)
});

const mapDispatch = dispatch => bindActionCreators({dismissModal, setFavoritedRestaurants}, dispatch);

export default connect(mapState, mapDispatch)(RestaurantDialog);

const styles = StyleSheet.create({
  container: {
    padding: spaces.big
  },
  header: {
    flexDirection: 'row',
    padding: spaces.medium,
    backgroundColor: Color(colors.accentDark).setAlpha(0.9),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  footer: {
    alignItems: 'flex-end',
    flex: 1,
    marginTop: spaces.big,
    flexDirection: 'row'
  }
});
