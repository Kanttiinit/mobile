'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Swiper from 'react-native-swiper2';
import Service from '../managers/Service';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import Loader from '../components/Loader';
import Favorites from '../managers/Favorite';

import Property from '../components/Property';

moment.locale('fi');

const {
   ListView,
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

class Restaurant extends React.Component {
   formatOpeningHours(hours) {
      return String(hours[0]).substr(0, 2) + ':' + String(hours[0]).substr(2) + ' - ' + String(hours[1]).substr(0, 2) + ':' + String(hours[1]).substr(2);
   }
   formatDistance(distance) {
      return distance < 1000 ? distance + ' m' : (distance / 1000).toFixed(1) + ' km';
   }
   render() {
      const {date, restaurant, openModal} = this.props;
      const courses = restaurant.courses;
      return (
         <View style={[MKCardStyles.card, styles.restaurant]}>

            <View style={[styles.restaurantHeader, !restaurant.isOpen && moment().isSame(date, 'day') && {backgroundColor: '#D32F2F'}]}>
               <View>
                  <Text style={{fontSize: 14, color: '#fff'}}>{restaurant.name}</Text>
                  {restaurant.distance ?
                     <Text style={{color: MKColor.Silver, fontSize: 10, paddingTop: 4}}>
                        <Icon name="ios-location" />
                        {' '}
                        {this.formatDistance(restaurant.distance)}
                     </Text>
                  : null}
               </View>
               <View style={{flex: 1}}>
                  <Text
                     style={{
                        textAlign: 'right',
                        color: restaurant.hours ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                        fontSize: 12
                     }}>
                     {restaurant.hours ? this.formatOpeningHours(restaurant.hours) : 'suljettu'}
                  </Text>
               </View>
            </View>

            {!courses.length ?
               <View style={{padding: 10}}>
                  <Text style={{color: MKColor.Grey, fontSize: 12, textAlign: 'center'}}>Ei menua saatavilla.</Text>
               </View>
            : courses.map((course, i) =>
               <View key={course.title} style={{backgroundColor: course.favorite ? '#f7eaea' : undefined}}>
                  <View style={[styles.course, i > 0 && styles.borderTop]}>
                     {course.favorite ? <Icon style={{marginRight: 6}} color='#fc5151' name='heart' /> : null}
                     <Text key={course.title} style={{flex: 1, fontSize: 12}}>{course.title}</Text>
                     {course.properties ? course.properties.map(p => <Property style={{marginLeft: 2}} key={p}>{p}</Property>) : null}
                  </View>
               </View>
            )}
         </View>
      );
   }
}

class Menu extends React.Component {
   constructor() {
      super();

      this.state = {
         days: Array(7).fill(1).map((n, i) => moment().add(i, 'days'))
      };
   }
   componentDidMount() {
      this.props.events.on('MENU', route => {
         Favorites.getStoredFavorites()
         .then(favourites => this.setState({favourites}));

         Service.getRestaurants()
         .then(restaurants => {
            this.setState({
               restaurants: Service.updateRestaurantDistances(restaurants, this.state.location)
            });

            if (!this.state.location) {
               return Service.getLocation().then(location => {
                  console.log(location);
                  this.setState({
                     location,
                     restaurants: Service.updateRestaurantDistances(this.state.restaurants, location)
                  });
               });
            }
         })
         .catch(err => {
            console.error(err);
         });
      });
   }
   renderDay(date) {
      const restaurants = Service.formatRestaurants(this.state.restaurants, date, this.state.favourites);
      const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return (
         <View key={date} style={{flex: 1, paddingBottom: 75}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>{date.format('dddd DD.MM.')}</Text>
            </View>
            <ListView
               initialListSize={6}
               dataSource={dataSource.cloneWithRows(restaurants)}
               renderRow={restaurant =>
                  <Restaurant date={date} restaurant={restaurant} openModal={this.openModal.bind(this)} />
               } />
         </View>
      );
   }
   openModal(course) {
      this.refs.modal.open();
   }
   render() {
      const {restaurants, favourites, days} = this.state;
      const course = this.state.course || {};
      return (
         <View style={styles.container}>
            {restaurants && favourites ?
            <Swiper
               showsPagination={false}
               style={{flex: 1, position: 'relative'}}
               loop={false}>
               {days.map(date => this.renderDay(date))}
            </Swiper>
            : <Loader color={MKColor.Teal} />}
            <Modal
               ref="modal"
               style={styles.modal}>
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
