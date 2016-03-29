'use strict';

import React from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import geolib from 'geolib';

import {colors} from '../../style';

const {
	View,
	Text,
	StyleSheet,
} = React;

class Map extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	render() {
		const {restaurants} = this.props;
		return (
			<View
				style={styles.container}>
				<MapView
				style={styles.mapView}
				showsUserLocation={true}>
				{ restaurants ? restaurants.map((restaurant, i) =>
					<MapView.Marker
					key={i}
					title={restaurant.name}
					coordinate={{
						latitude: restaurant.latitude,
						longitude: restaurant.longitude
					}}>
					</MapView.Marker>) : null }
				</MapView>
			</View>
		);
	}


}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	mapView: {
		flex: 1
	}
});


export default connect(
	state => ({
		restaurants: state.restaurants
	}),
	dispatch => ({
	})
)(Map);
