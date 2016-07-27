import React from 'react';
import Loader from './reusable/Loader';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ListView, View, Text, StyleSheet, Platform} from 'react-native';

import {openModal} from '../store/actions/modal';
import Area from './Area';
import Button from './reusable/Button';
import ContactForm from './reusable/ContactForm';

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

const Restaurants = ({openModal, areas, loading}) => (
   <View style={styles.container}>
      <Button
         onPress={() => openModal(<ContactForm type="missing-restaurant">Mikä ravintola puuttuu?</ContactForm>)}
         style={[defaultStyles.button, {padding: spaces.medium, margin: spaces.medium}]}>
         <Text style={{color: colors.white, fontSize: 14, textAlign: 'center'}}>ILMOITA PUUTTUVASTA RAVINTOLASTA</Text>
      </Button>
      {loading ? <Loader color={colors.accent} /> :
      <ListView
         removeClippedSubviews={false}
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
   areas: state.data.areas,
   loading: state.pending.areas
});

const mapDispatch = dispatch => bindActionCreators({openModal}, dispatch);

export default connect(mapState, mapDispatch)(Restaurants);
