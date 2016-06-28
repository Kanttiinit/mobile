import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {openModal} from '../../../store/actions/modal';

import CourseDetails from './CourseDetails';
import Property from './Property';
import Button from '../../Button';
import {colors} from '../../../style';

import {View, Text, StyleSheet, Platform} from 'react-native';

const Course = ({course, isFavorite, restaurant, style}) => (
   <Button
      highlightColor={colors.lightGrey}
      onPress={() => this.props.openModal(<CourseDetails course={course} restaurant={restaurant} />)}
      style={[isFavorite ? styles.favoriteCourse : {borderRadius: 2}]}>
      <View style={[styles.course, style]}>
         {isFavorite ? <Icon style={{marginRight: 6}} color='#fc5151' name='md-heart' /> : null}
         <Text key={course.title} style={styles.courseTitle}>{course.title}</Text>
         {course.properties ? course.properties.map(p => <Property style={{marginLeft: 2}} key={p}>{p}</Property>) : null}
      </View>
   </Button>
);

const mapState = (state, props) => ({
   isFavorite: state.favorites.selected.some(selectedId => {
      const favorite = state.favorites.items.find(f => f.id === selectedId);
      if (favorite) {
         return props.course.title.match(new RegExp(favorite.regexp, 'i'));
      }
   })
});

const mapDispatch = dispatch => bindActionCreators({openModal}, dispatch);

export default connect(mapState, mapDispatch)(Course);

const styles = StyleSheet.create({
   course: {
      flexDirection: 'row',
      paddingTop: 6,
      paddingBottom: 6,
      alignItems: 'center',
      marginLeft: 8,
      marginRight: 8
   },
   favoriteCourse: {
      backgroundColor: '#fff9f9',
      borderRadius: 0
   },
   courseTitle: {
      flex: 1,
      fontSize: 12,
      color: colors.darkGrey
   }
});
