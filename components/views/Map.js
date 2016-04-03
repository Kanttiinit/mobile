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
	switchRestaurant() {

	}
	render() {
		const {restaurants} = this.props;
		console.log("ASDASD", restaurants);
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
				<View
					style={styles.infoContainer}>
					<Text>WOUU</Text>
				</View>
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
	},
	infoContainer: {
		position: 'absolute',
		bottom: 50,
		flex: 1,
		marginHorizontal: 10,
		backgroundColor: colors.lightGrey,
		borderRadius: 2
	}
});


export default connect(
	state => ({
		restaurants: state.areas ? [].concat.apply(this, state.areas.map(area => area.Restaurants)) : undefined
	}),
	dispatch => ({
	})
)(Map);
