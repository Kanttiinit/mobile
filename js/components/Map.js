import React from 'react';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';

import RestaurantDialog from './RestaurantDialog';
import {openModal} from '../store/actions/modal';
import {selectRestaurants} from '../store/selectors';

const Map = ({restaurants, openRestaurantModal}) => (
  <View
    style={styles.container}>
    <MapView
      style={styles.mapView}
      followsUserLocation={true}
      initialRegion={{
        latitude: 60.191042,
        longitude: 24.872114,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2
      }}
      showsUserLocation={true}>
      {restaurants.map(restaurant =>
        <MapView.Marker
          key={restaurant.id}
          pinColor={colors.accent}
          onSelect={() => openRestaurantModal(restaurant)}
          onPress={() => openRestaurantModal(restaurant)}
          coordinate={restaurant} />
      )}
    </MapView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapView: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  restaurants: selectRestaurants(state)
});

const mapDispatchToProps = dispatch => ({
  openRestaurantModal(restaurant) {
    dispatch(openModal(<RestaurantDialog restaurant={restaurant} />, {padding: 0}));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
