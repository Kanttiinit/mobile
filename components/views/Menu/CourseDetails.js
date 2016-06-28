import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {bindActionCreators} from 'redux';

import Property from './Property';
import Button from '../../Button';
import {colors, defaultStyles} from '../../../style';
import {dismissModal} from '../../../store/actions/modal';
import {setIsSelected} from '../../../store/actions/favorites';

import {View, Text, StyleSheet} from 'react-native';

function getFavorites(course, favorites) {
   return favorites.filter(f => course.title.match(new RegExp(f.regexp, 'i')));
}

const CourseDetails = ({course, favorites, restaurant, setIsSelected, dismissModal}) => (
   <View style={styles.container}>
      <View>
         <Text style={styles.courseTitle}>{course.title}</Text>
      </View>
      <View style={styles.courseListWrapper}>
         {course.properties && course.properties.length ?
         course.properties.map(p => <Property key={p} containerStyle={{marginTop: 8}} large={true}>{p}</Property>)
         : undefined}
      </View>
      <View style={{flexDirection: 'row', marginVertical: 4}}>
         {getFavorites(course, favorites).sort((a, b) => a.name < b.name ? -1 : 1).map(f =>
         <Button
            key={f.id}
            onPress={() => setIsSelected(f.id, !f.selected)}
            style={{padding: 4, marginRight: 4, backgroundColor: f.selected ? colors.red : 'transparent', borderColor: colors.red, borderWidth: 1, borderRadius: 2}}>
            <Text style={{color: f.selected ? 'white' : colors.red}}>
               <Icon name={'md-heart' + (f.selected ? '' : '-outline')} />
               {' ' + f.name}
            </Text>
         </Button>
         )}
      </View>
      <View style={styles.footer}>
         <Text style={styles.restaurantName}>{restaurant.name}</Text>
         <Button
            onPress={() => dismissModal()}>
            <Text style={defaultStyles.lightButtonText}>SULJE</Text>
         </Button>
      </View>
   </View>
);

const mapState = state => ({
   favorites: state.favorites.items
});

const mapDispatch = dispatch => bindActionCreators({setIsSelected, dismissModal}, dispatch);

export default connect(mapState, mapDispatch)(CourseDetails);

CourseDetails.defaultProps = {
   course: {}
};

const styles = StyleSheet.create({
   container: {
      borderRadius: 2
   },
   courseTitle: {
      fontSize: 18,
      color: 'black'
   },
   courseListWrapper: {
      marginTop: 10,
      marginBottom: 10,
      paddingTop: 0
   },
   footer: {
      alignItems: 'center',
      flexDirection: 'row'
   },
   restaurantName: {
      alignSelf: 'flex-end',
      color: '#777',
      flex: 1
   }
});
