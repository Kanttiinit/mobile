'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import momentFI from 'moment/locale/fi';
import Swiper from 'react-native-swiper2';
import Service from '../managers/Service';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';
import Favorites from '../managers/Favorites';

import Property from '../components/Property';

moment.locale('fi');

const {
   ListView,
   View,
   Text,
   StyleSheet,
   Dimensions,
   DeviceEventEmitter,
   AppStateIOS,
   Platform
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
      const isToday = moment().isSame(date, 'day');
      const restaurantHeaderColor = restaurant.isOpen ? MKColor.Teal : '#D32F2F';
      return (
         <View style={[MKCardStyles.card, styles.restaurant]}>

            <View style={[styles.restaurantHeader, isToday && {backgroundColor: restaurantHeaderColor}]}>
               <View>
                  <Text style={{fontSize: 14, color: '#fff'}}>{restaurant.name}</Text>
                  {restaurant.distance ?
                     <Text style={{color: MKColor.Silver, fontSize: 10, paddingTop: 4, height: 16}}>
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
                     {course.favorite ? <Icon style={{marginRight: 6}} color='#fc5151' name='android-favorite' /> : null}
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

      this.state = {days: this.getDays()};
   }
   getDays() {
      return Array(7).fill(1).map((n, i) => moment().add(i, 'days'));
   }
   componentDidMount() {
      if (Platform.OS === 'ios')
         AppStateIOS.addEventListener('change', this.handleStateChange.bind(this));
      
      DeviceEventEmitter.addListener('start', this.update.bind(this));
      this.props.events.on('MENU', this.update.bind(this));
      this.update();
   }
   handleStateChange(currentAppState) {
      if (currentAppState === 'active') {
         this.update();
      }
   }
   update() {
      if (this.state.loading)
         return;

      if (!this.state.days[0].isSame(moment(), 'day'))
         this.setState({days: this.getDays()});

      // shit is loading, yo
      this.setState({loading: true});

      // fetch favorites
      Favorites.getStoredFavorites()
      .then(favorites => this.setState({favorites}));

      // update restaurant list
      Service.getRestaurants()
      .then(restaurants => {
         this.setState({
            restaurants: Service.updateRestaurantDistances(restaurants, this.state.location)
         });

         // if no location is known, try to get it
         if (!this.state.location) {
            return Service.getLocation().then(location => {
               this.setState({
                  location,
                  restaurants: Service.updateRestaurantDistances(this.state.restaurants, location)
               });
               this.setState({loading: false});
            });
         } else {
            this.setState({loading: false});
         }
      })
      .catch(err => {
         console.error(err);
      });
   }
   renderDay(date) {
      const restaurants = Service.formatRestaurants(this.state.restaurants, date, this.state.favorites);
      const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return (
         <View key={date} style={{flex: 1, paddingBottom: 75}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>
                  {date.format('dddd').toUpperCase()}
                  <Text style={styles.date}> {date.format('DD.MM.')}</Text>
               </Text>
            </View>
            <ListView
               initialListSize={2}
               pageSize={3}
               dataSource={dataSource.cloneWithRows(restaurants)}
               renderRow={restaurant =>
                  <Restaurant date={date} restaurant={restaurant} openModal={this.openModal.bind(this)} />} />
         </View>
      );
   }
   openModal(course) {
      this.refs.modal.open();
   }
   render() {
      const {restaurants, favorites, days, loading} = this.state;
      const course = this.state.course || {};
      return (
         <View style={styles.container}>
            {restaurants && favorites ?
               <Swiper
                  showsPagination={false}
                  loop={false}>
                  {days.map(date => this.renderDay(date))}
               </Swiper>
            : <Loader color={MKColor.Teal} />}
            {restaurants && loading ?
               <mdl.Spinner
                  strokeColor={MKColor.Teal}
                  style={{position: 'absolute', top: 10, right: 10, transform: [{scale: 0.7}]}} />
            : null}
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
      padding: 14
   },
   dayTitle: {
      fontSize: 20,
      fontWeight: '300',
      flex: 1,
      fontFamily: Platform.OS === 'android' && 'sans-serif-light'
   },
   date: {
      color: '#bababa'
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
      backgroundColor: '#7c7c7c',
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
   }
});

export default Menu;
