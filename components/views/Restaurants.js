import React from 'react';
import Loader from '../Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {openModal} from '../../store/actions/modal';

import Area from './Restaurants/Area';
import {colors, spaces, defaultStyles} from '../../style';
import Button from '../Button';
import ContactForm from '../ContactForm';

import {ListView, View, Text, StyleSheet, Platform} from 'react-native';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

const Restaurants = ({openModal, areas, loading}) => (
   <View style={styles.container}>
      <Button
         onPress={() => openModal(<ContactForm type="missing-restaurant">Mikä ravintola puuttuu?</ContactForm>)}
         style={[defaultStyles.button, {padding: spaces.medium, margin: spaces.medium}]}>
         <Text style={{color: 'white', fontSize: 14, textAlign: 'center'}}>ILMOITA PUUTTUVASTA RAVINTOLASTA</Text>
      </Button>
      {loading ? <Loader color={colors.accent} /> :
      <ListView
         enableEmptySections={true}
         dataSource={dataSource.cloneWithRows(areas)}
         renderRow={area => <Area area={area} />} />
      }
   </View>
);

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.lightGrey
   }
});

const mapState = state => ({
   areas: state.areas.items,
   loading: state.areas.loading
});

const mapDispatch = dispatch => bindActionCreators({openModal}, dispatch);

export default connect(mapState, mapDispatch)(Restaurants);
