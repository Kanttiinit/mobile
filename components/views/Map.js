'use strict';

import React from 'react-native';
import {connect} from 'react-redux';

import MapView from 'react-native-maps';

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
			<View>
			<Text>MOI MA OON KARTTA</Text>
			</View>
		);
	}


}

const styles = StyleSheet.create({
});


export default connect(
	state => ({
		restaurants: state.restaurant
	}),
	dispatch => ({
	})
)(Map);
