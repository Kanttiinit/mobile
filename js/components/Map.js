import React from 'react';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, StyleSheet} from 'react-native';

import RestaurantDialog from './RestaurantDialog';
import {openModal} from '../store/actions/modal';
import {selectRestaurants} from '../store/selectors';

const Map = ({restaurants, openModal}) => (
  <View
    style={styles.container}>
    <MapView
      style={styles.mapView}
      followsUserLocation={true}
      showsUserLocation={true}>
      {restaurants.map(restaurant =>
        <MapView.Marker
          key={restaurant.id}
          pinColor={colors.accent}
          title={restaurant.title}
          description={restaurant.address}
          onCalloutPress={() => openModal(<RestaurantDialog restaurant={restaurant} />, {padding: 0})}
          coordinate={restaurant}
          title={restaurant.title} />
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

const mapDispatchToProps = dispatch => bindActionCreators({openModal}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
