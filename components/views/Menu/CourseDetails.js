'use strict';

import React from 'react-native';
import {connect} from 'react-redux';

import {dismissModal} from '../../../store/actions';

import Property from './Property';
import Button from '../../Button';
import {colors} from '../../../style';

const {
   View,
   Text,
   Component,
   StyleSheet,
   TouchableOpacity
} = React;

class CourseDetails extends Component {
   render() {
      const {course} = this.props;
      return (
         <View style={styles.container}>
            <View>
               <Text style={styles.courseTitle}>{course.title}</Text>
            </View>
            <View style={styles.courseListWrapper}>
               {course.properties && course.properties.length ?
               course.properties.map(p => <Property key={p} containerStyle={{marginTop: 8}} large={true}>{p}</Property>)
               :
               undefined}
            </View>
            <View style={styles.footer}>
               <Text style={styles.restaurantName}>{course.restaurant.name}</Text>
               <Button
                  onPress={() => this.props.dismissModal()}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>SULJE</Text>
               </Button>
            </View>
         </View>
      );
   }
}

export default connect(
   undefined,
   dispatch => ({
      dismissModal: () => dispatch(dismissModal())
   })
)(CourseDetails);

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
   },
   closeButton: {
      backgroundColor: colors.accent,
      borderRadius: 2,
      padding: 6,
   },
   closeButtonText: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold'
   }
});
