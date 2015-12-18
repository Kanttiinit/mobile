'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Swiper from 'react-native-swiper2';
import Service from '../managers/Service';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import Loader from '../components/Loader';

moment.locale('fi');

const {
   ScrollView,
   View,
   Text,
   StyleSheet
} = React;

const {
   MKCardStyles,
   MKButton,
   MKColor,
   mdl
} = Material;

class Property extends React.Component {
   getColor(p) {
      const colors = {
         'L': MKColor.Brown,
         'G': MKColor.DeepOrange,
         'V': MKColor.Green,
         'M': MKColor.Pink,
         'VL': MKColor.Indigo,
         'A': MKColor.BlueGrey
      };
      if (p in colors)
         return colors[p];

      return MKColor.Grey;
   }
   render() {
      const p = this.props.children;
      return (
         <View key={p} style={{
               width: 16,
               height: 16,
               marginLeft: 3,
               borderRadius: 8,
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor: this.getColor(p)}}>
            <Text style={{fontSize: 8, fontWeight: 'bold', color: '#fff'}}>{p}</Text>
         </View>
      );
   }
}

class Course extends React.Component {
   render() {
      const {course, isFirst, openModal} = this.props;
      return (
         <MKButton rippleColor="rgba(100, 100, 100, 0.1)" onPress={openModal.bind(null, course)} style={[styles.course, !isFirst && styles.borderTop]}>
            <Text key={course.title} style={{flex: 1, fontSize: 12}}>{course.title}</Text>
            {course.properties ? course.properties.map(p => <Property key={p}>{p}</Property>) : null}
         </MKButton>
      );
   }
}

class Restaurant extends React.Component {
   formatOpeningHours(hours) {
      return String(hours[0]).substr(0, 2) + ':' + String(hours[0]).substr(2) + ' - ' + String(hours[1]).substr(0, 2) + ':' + String(hours[1]).substr(2);
   }
   formatDistance(distance) {
      if (distance <= 1000) {
         return distance + ' m';
      } else {
         return (distance / 1000).toFixed(1) + ' km';
      }
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
            {restaurant.courses.map((c, i) => <Course openModal={openModal} key={c.title} isFirst={i === 0} course={c} />)}
            {!restaurant.courses.length ? <Text style={{color: MKColor.Grey, fontSize: 12, padding: 8, textAlign: 'center'}}>Ei menua saatavilla.</Text> : null}
         </View>
      );
   }
}

class Menu extends React.Component {
   constructor() {
      super();
      this.state = {
         today: moment()
      };
   }
   componentDidMount() {
      Service.updateLocation();
      this.props.events.on('MENU', route => {
         Service.getRestaurants(true).then(restaurants => this.setState({restaurants}))
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
      this.refs.modal.open();
      setTimeout(() => {
         this.setState({course});
      }, 500);
   }
   render() {
      if (this.state.restaurants)
         return (
            <View style={styles.container}>
               <Swiper
                  showsPagination={false}
                  style={{flex: 1, position: 'relative'}}
                  loop={false}>
                  {Array(5).fill(1).map((n, i) => moment(this.state.today).add(i, 'days')).map(date => this.renderDay(date))}
               </Swiper>
               <Modal ref="modal" style={styles.modal}>
                  <Text>{this.state.course ? this.state.course.title : null}</Text>
               </Modal>
            </View>
         );

      return <Loader />;
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
      height: 300
   }
});

export default Menu;
