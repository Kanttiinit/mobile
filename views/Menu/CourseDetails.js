'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';

import Property from '../../components/Property';

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

class CourseDetails extends Component {
   render() {
      const {course} = this.props;
      return (
         <View>
            <View style={styles.courseTitleWrapper}>
               <Text style={styles.courseTitle}>{course.title}</Text>
            </View>
            <View style={styles.courseListWrapper}>
               {course.properties ?
                  course.properties.map(p => <Property key={p} containerStyle={{marginTop: 8}} large={true}>{p}</Property>)
                  : null}
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
   courseTitleWrapper: {
      backgroundColor: MKColor.Teal,
      padding: 10
   },
   courseTitle: {
      fontSize: 18,
      fontWeight: '300',
      color: 'white'
   },
   courseListWrapper: {
      padding: 10,
      paddingTop: 0
   },
   footer: {
      padding: 8,
      backgroundColor: '#ddd',
      alignItems: 'center',
      flexDirection: 'row'
   },
   restaurantName: {
      color: '#777',
      flex: 1
   },
   closeButton: {
      backgroundColor: MKColor.Teal,
      padding: 4,
      borderRadius: 2
   },
   closeButtonText: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold'
   }
});

export default CourseDetails;
