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
         <View>
            <View style={styles.courseTitleWrapper}>
               <Text style={styles.courseTitle}>{course.title}</Text>
            </View>
            <View style={styles.courseListWrapper}>
               {course.properties && course.properties.length ?
               course.properties.map(p => <Property key={p} containerStyle={{marginTop: 8}} large={true}>{p}</Property>)
               :
               <Text style={{marginTop: 10, color: MKColor.Grey}}>Ei ominaisuuksia.</Text>}
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
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      backgroundColor: MKColor.Silver,
      padding: 14
   },
   courseTitle: {
      fontSize: 18,
      color: 'black'
   },
   courseListWrapper: {
      backgroundColor: MKColor.Silver,
      padding: 14,
      paddingTop: 0
   },
   footer: {
      backgroundColor: MKColor.Silver,
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
      padding: 14,
      alignItems: 'center',
      flexDirection: 'row'
   },
   restaurantName: {
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
