import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Property from './Property';
import Button from '../../Button';
import {colors} from '../../../style';
import {dismissModal} from '../../../store/actions/modal';
import {addFavorite, removeFavorite} from '../../../store/actions/favorites';

import {
   View,
   Text,
   Component,
   StyleSheet,
   TouchableOpacity
} from 'react-native';

class CourseDetails extends Component {
   getFavorites() {
      const title = this.props.course.title;
      return this.props.favorites.filter(f => title.match(new RegExp(f.regexp, 'i')));
   }
   render() {
      const {course, addFavorite, removeFavorite} = this.props;
      return (
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
               {this.getFavorites().sort((a, b) => a.name < b.name ? -1 : 1).map(f =>
               <Button
                  key={f.id}
                  onPress={() => f.selected ? removeFavorite(f.id) : addFavorite(f.id)}
                  style={{padding: 4, marginRight: 4, backgroundColor: f.selected ? colors.red : 'transparent', borderColor: colors.red, borderWidth: 1, borderRadius: 2}}>
                  <Text style={{color: f.selected ? 'white' : colors.red}}>
                     <Icon name={'android-favorite' + (f.selected ? '' : '-outline')} />
                     {' ' + f.name}
                  </Text>
               </Button>
               )}
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

const mapState = state => ({
   favorites: state.favorites.favorites
});

const mapDispatch = state => ({dismissModal, addFavorite, removeFavorite});

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
