'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Swiper from 'react-native-swiper2';
import Service from '../managers/Service';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import Loader from '../components/Loader';

import Property from '../components/Property';

moment.locale('fi');

const {
   ScrollView,
   View,
   Text,
   StyleSheet,
   Dimensions
} = React;

const {
   MKCardStyles,
   MKButton,
   MKColor,
   mdl
} = Material;

class Course extends React.Component {
   render() {
      const {course, isFirst} = this.props;
      return (
         <View style={[styles.course, !isFirst && styles.borderTop]}>
            <Text key={course.title} style={{flex: 1, fontSize: 12}}>{course.title}</Text>
            {course.properties ? course.properties.map(p => <Property style={{marginLeft: 2}} key={p}>{p}</Property>) : null}
         </View>
      );
   }
}

class Restaurant extends React.Component {
   formatOpeningHours(hours) {
      return String(hours[0]).substr(0, 2) + ':' + String(hours[0]).substr(2) + ' - ' + String(hours[1]).substr(0, 2) + ':' + String(hours[1]).substr(2);
   }
   formatDistance(distance) {
      return distance < 1000 ? distance + ' m' : (distance / 1000).toFixed(1) + ' km';
   }
   render() {
      const {date, restaurant, openModal} = this.props;
      return (
         <View style={[MKCardStyles.card, styles.restaurant]}>
            <View style={[styles.restaurantHeader, !restaurant.isOpen && moment().isSame(date, 'day') && {backgroundColor: '#D32F2F'}]}>
               <View>
                  <Text style={{fontSize: 14, color: '#fff'}}>{restaurant.name}</Text>
                  {restaurant.distance ?
                  <Text style={{color: MKColor.Silver, fontSize: 10, paddingTop: 4}}>
                  <Icon name="ios-location">{"  "}</Icon>
                  {this.formatDistance(restaurant.distance)}
                  </Text>
                  : null}
               </View>
               <View style={{flex: 1}}>
                  <Text
                     style={{
                        textAlign: 'right',
                        color: restaurant.hours ? '#fff' : '#80CBC4',
                        fontSize: 12
                     }}>
                     {restaurant.hours ? this.formatOpeningHours(restaurant.hours) : 'suljettu'}
                  </Text>
               </View>
            </View>
            {restaurant.courses.map((c, i) => (
               <MKButton key={c.title} rippleColor="rgba(100, 100, 100, 0.1)" onPress={openModal.bind(null, c)}>
                  <Course isFirst={i === 0} course={c} />
               </MKButton>
            ))}
            {!restaurant.courses.length ?
               <View style={{padding: 10}}>
                  <Text style={{color: MKColor.Grey, fontSize: 12, textAlign: 'center'}}>Ei menua saatavilla.</Text>
               </View>
            : null}
         </View>
      );
   }
}

class Menu extends React.Component {
   constructor() {
      super();
      this.state = {
         days: Array(5).fill(1).map((n, i) => moment().add(i, 'days'))
      };
   }
   componentDidMount() {
      Service.updateLocation()
      .then(location => {
         console.log(location);
      });

      this.props.events.on('MENU', route => {
         Service.getRestaurants()
         .then(restaurants => this.setState({restaurants}))
         .catch(err => {
            console.error(err);
         });
      });
   }
   renderDay(date) {
      const restaurants = Service.formatRestaurants(this.state.restaurants, date);
      return (
         <View key={date} style={{flex: 1, paddingBottom: 75}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>{date.format('dddd DD.MM.')}</Text>
            </View>
            <ScrollView>
               {restaurants.map(r => <Restaurant key={r.id} date={date} restaurant={r} openModal={this.openModal.bind(this)} />)}
            </ScrollView>
         </View>
      );
   }
   openModal(course) {
      this.pendingCourse = course;
      this.refs.modal.open();
   }
   onModalOpened() {
      this.setState({course: this.pendingCourse});
   }
   onModalClosed() {
      this.setState({course: undefined});
   }
   render() {
      const {restaurants, days} = this.state;
      const course = this.state.course || {};
      return (
         <View style={styles.container}>
            {restaurants ?
            <Swiper
               showsPagination={false}
               style={{flex: 1, position: 'relative'}}
               loop={false}>
               {days.map(date => this.renderDay(date))}
            </Swiper>
            : <Loader color={MKColor.Teal} />}
            <Modal ref="modal"
               onOpened={this.onModalOpened.bind(this)}
               onClosed={this.onModalClosed.bind(this)}
               style={styles.modal}>
               <Text style={{fontSize: 18, padding: 10, backgroundColor: MKColor.Silver}}>{course.title}</Text>
            </Modal>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: MKColor.Silver,
      flex: 1
   },
   daySelector: {
      flexDirection: 'row',
      padding: 10
   },
   dayTitle: {
      flex: 1,
      fontSize: 20,
      textAlign: 'center',
      fontWeight: '300'
   },
   dayChangeButton: {
      padding: 8
   },
   restaurant: {
      marginLeft: 14,
      marginRight: 14,
      marginBottom: 14,
      paddingBottom: 0
   },
   restaurantHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: MKColor.Teal,
      padding: 8
   },
   course: {
      flexDirection: 'row',
      paddingTop: 8,
      paddingBottom: 8,
      alignItems: 'center',
      marginLeft: 8,
      marginRight: 8
   },
   borderTop: {
      borderTopWidth: 1,
      borderTopColor: '#eee'
   },
   modal: {
      width: Dimensions.get('window').width - 32,
      height: 300
   }
});

export default Menu;
