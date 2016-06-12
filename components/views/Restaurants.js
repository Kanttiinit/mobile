'use strict';

import React from 'react-native';
import Loader from '../Loader';
import {connect} from 'react-redux';

import {openModal} from '../../store/actions/modal';
import {fetchAreas} from '../../store/actions/areas';

import Area from './Restaurants/Area';
import {colors} from '../../style';
import Button from '../Button';
import ContactForm from '../ContactForm';

const {
   ListView,
   View,
   Text,
   StyleSheet,
   Platform
} = React;

class Restaurants extends React.Component {
   constructor() {
      super();
      this.state = {};
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
   }
   componentDidMount() {
      this.props.fetchAreas();
   }
   render() {
      return (
         <View style={styles.container}>
            <Button
               onPress={() => this.props.showModal(<ContactForm type="missing-restaurant">Mikä ravintola puuttuu?</ContactForm>)}
               style={{padding: 8, margin: 8, borderRadius: 2, backgroundColor: colors.accent}}>
               <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>ILMOITA PUUTTUVASTA RAVINTOLASTA</Text>
            </Button>
            {this.props.areas ?
            <ListView
               contentContainerStyle={{paddingBottom: 22}}
               dataSource={this.dataSource.cloneWithRows(this.props.areas)}
               renderRow={area => <Area area={area} />} />
            : <Loader color={colors.accent} />}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.lightGrey
   }
});

const mapState = state => ({
   areas: state.areas
});

const mapDispatch = dispatch => ({
   fetchAreas() {
      dispatch(fetchAreas());
   },
   showModal() {
      dispatch(openModal());
   }
});

export default connect(mapState, mapDispatch)(Restaurants);
