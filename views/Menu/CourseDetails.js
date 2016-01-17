'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';

import Property from './Property';

const {
   View,
   Text,
   Component,
   StyleSheet
} = React;

const {
   MKButton,
   MKColor
} = Material;

export default class CourseDetails extends Component {
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
               <MKButton
                  onPress={this.context.closeCourseDialog}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>SULJE</Text>
               </MKButton>
            </View>
         </View>
      );
   }
}

CourseDetails.contextTypes = {
   closeCourseDialog: React.PropTypes.func
};

CourseDetails.defaultProps = {
   course: {}
};

const styles = StyleSheet.create({
   container: {
      borderRadius: 2,
      backgroundColor: MKColor.Silver,
      padding: 14
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
      backgroundColor: MKColor.Teal,
      borderRadius: 2,
      padding: 6,
   },
   closeButtonText: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold'
   }
});
