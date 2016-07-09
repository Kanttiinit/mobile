import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {openModal} from '../store/actions/modal';
import {isFavorite} from '../store/selectors';

import CourseDetails from './CourseDetails';
import Property from './reusable/Property';
import Button from './reusable/Button';


import {View, Text, StyleSheet, Platform} from 'react-native';

const Course = ({course, openModal, isFavorite, restaurant, style}) => (
   <Button
      highlightColor={colors.lightGrey}
      onPress={() => openModal(<CourseDetails course={course} restaurant={restaurant} />)}
      style={isFavorite && styles.favoriteCourse}>
      <View style={[styles.course, style]}>
         {isFavorite && <Icon style={{marginRight: spaces.small}} color={colors.red} name='md-heart' />}
         <Text key={course.title} style={styles.courseTitle}>{course.title}</Text>
         {course.properties && course.properties.map(p => <Property style={{marginLeft: 2}} key={p}>{p}</Property>)}
      </View>
   </Button>
);

const mapState = (state, props) => ({
   isFavorite: isFavorite(state, props)
});

const mapDispatch = dispatch => bindActionCreators({openModal}, dispatch);

export default connect(mapState, mapDispatch)(Course);

const styles = StyleSheet.create({
   course: {
      flexDirection: 'row',
      paddingTop: spaces.small,
      paddingBottom: spaces.small,
      alignItems: 'center',
      marginLeft: spaces.medium,
      marginRight: spaces.medium
   },
   favoriteCourse: {
      backgroundColor: colors.lightRed,
      borderRadius: 0
   },
   courseTitle: {
      flex: 1,
      color: colors.darkGrey,
      fontSize: 12
   }
});
