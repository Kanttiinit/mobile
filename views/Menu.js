'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Swiper from 'react-native-swiper2';
import Service from '../managers/Service';

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
               width: 18,
               height: 18,
               marginLeft: 3,
               borderRadius: 9,
               alignItems: 'center',
               justifyContent: 'center',
               backgroundColor: this.getColor(p)}}>
            <Text style={{fontSize: 10, fontWeight: 'bold', color: '#fff'}}>{p}</Text>
         </View>
      )
   }
}

class Course extends React.Component {
   render() {
      const {course, isFirst} = this.props;
      return (
         <View style={[styles.course, !isFirst && styles.borderTop]}>
            <Text key={course.title} style={{flex: 1}}>{course.title}</Text>
            {course.properties ? course.properties.map(p => <Property key={p}>{p}</Property>) : null}
         </View>
      );
   }
}

class Restaurant extends React.Component {
   formatOpeningHours(hours) {
      return String(hours[0]).substr(0, 2) + ':' + String(hours[0]).substr(2) + ' - ' + String(hours[1]).substr(0, 2) + ':' + String(hours[1]).substr(2);
   }
   render() {
      const {date} = this.props;
      const restaurant = Service.formatRestaurant(this.props.restaurant, date);
      return (
         <View style={[MKCardStyles.card, styles.restaurant]}>
            <View style={styles.restaurantHeader}>
               <Text style={{fontSize: 20, color: '#fff', paddingBottom: 4}}>{restaurant.name}</Text>
               {restaurant.distance ?
               <Text style={{color: MKColor.Silver, fontSize: 12, marginLeft: 4}}>{(restaurant.distance / 1000).toFixed(1) + ' km'}</Text>
               : null}
               <Text
                  style={{
                     flex: 1,
                     textAlign: 'right',
                     color: restaurant.hours ? MKColor.Silver : '#80CBC4'
                  }}>
                  {restaurant.hours ? this.formatOpeningHours(restaurant.hours) : 'suljettu'}
               </Text>

               <View style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginLeft: 4,
                  backgroundColor: restaurant.isOpen ? '#64DD17' : '#D50000'
               }} />
            </View>
            {restaurant.courses.map((c, i) => <Course key={c.title} isFirst={i === 0} course={c} />)}
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
      Service.getRestaurants().then(restaurants => this.setState({restaurants}));
      Service.updateLocation();
   }
   renderDay(date) {
      const restaurants = this.state.restaurants;
      return (
         <View key={date} style={{flex: 1, paddingBottom: 75}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>{date.format('ddd DD.MM.')}</Text>
            </View>
            <ScrollView>
               {this.state.restaurants.map(r => <Restaurant key={r.id} date={date} restaurant={r} />)}
            </ScrollView>
         </View>
      );
   }
   render() {
      if (this.state.restaurants)
         return (
            <View style={styles.container}>
               <Swiper
                  showsPagination={false}
                  style={{flex: 1, position: 'relative'}}
                  loop={false}>
                  {Array(7).fill(1).map((n, i) => moment(this.state.today).add(i, 'days')).map(date => this.renderDay(date))}
               </Swiper>
            </View>
         );

      return (
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <mdl.Spinner />
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
      flex: 1,
      fontSize: 24,
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
      padding: 8
   },
   borderTop: {
      borderTopWidth: 1,
      borderTopColor: '#eee'
   }
});

export default Menu;
