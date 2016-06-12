import React from 'react';
import MapView from 'react-native-maps';
import {connect} from 'redux-nimble';
import geolib from 'geolib';

import {colors} from '../../style';

import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

class Map extends React.Component {
	constructor() {
		super();
		this.state = {};
	}
	switchRestaurant() {

	}
	render() {
		const {areas} = this.props;

		return (
			<View
				style={styles.container}>
				<MapView
				style={styles.mapView}
				showsUserLocation={true}>
				{ areas ? [].concat.apply(this, areas.map(area => area.Restaurants))
					.map((restaurant, i) =>
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


export default connect(['areas'])(Map);
