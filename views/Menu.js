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
         'G': MKColor.Amber,
         'V': MKColor.Green,
         'M': MKColor.Black
      };
      if (colors[p])
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
            <Text style={{fontSize: 10, fontWeight: 'bold', color: MKColor.Silver}}>{p}</Text>
         </View>
      )
   }
}

class Course extends React.Component {
   render() {
      const {course} = this.props;
      return (
         <View style={{flexDirection: 'row'}}>
            <Text key={course.title} style={{flex: 1, marginBottom: 8}}>{course.title}</Text>
            {course.properties ? course.properties.map(p =><Property key={p}>{p}</Property>) : null}
         </View>
      );
   }
}

class Restaurant extends React.Component {
   formatOpeningHours(hours) {
      if (!hours)
         return 'suljettu';
      return String(hours[0]).substr(0, 2) + ':' + String(hours[0]).substr(2) + ' - ' + String(hours[1]).substr(0, 2) + ':' + String(hours[1]).substr(2);
   }
   render() {
      const {date} = this.props;
      const restaurant = Service.formatRestaurant(this.props.restaurant, date);
      return (
         <View style={[MKCardStyles.card, styles.menuItem]}>
            <View style={styles.restaurantHeader}>
               <Text style={{fontSize: 20, paddingBottom: 4}}>{restaurant.name}</Text>
               {restaurant.distance ?
               <Text style={{color: MKColor.Grey, fontSize: 12, marginLeft: 4}}>{(restaurant.distance / 1000).toFixed(1) + ' km'}</Text>
               : null}
               <Text
                  style={{
                     flex: 1,
                     textAlign: 'right',
                     color: !date.isSame(moment(), 'day') ? MKColor.Grey
                        : restaurant.isOpen ? MKColor.Green
                        : MKColor.Red
                  }}>
                  {this.formatOpeningHours(restaurant.hours)}
               </Text>
            </View>
            {restaurant.courses.map(c => <Course key={c.title} course={c} />)}
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
         <View key={date} style={{flex: 1, paddingBottom: 90}}>
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
   menuItem: {
      marginLeft: 14,
      marginRight: 14,
      marginBottom: 14,
      padding: 8
   },
   restaurantHeader: {
      flexDirection: 'row',
      alignItems: 'center'
   }
});

export default Menu;
