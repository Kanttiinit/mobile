'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';
import Swiper from 'react-native-swiper2';
import Service from '../Service';

const {
   ScrollView,
   View,
   Text,
   StyleSheet
} = React;

const {
   MKCardStyles,
   MKButton,
   MKColor
} = Material;

class Course extends React.Component {
   render() {
      const {course} = this.props;
      return (
         <View>
            <Text key={course.title}>
               {course.title}
               {course.properties ? ' (' + course.properties.join(', ') + ')' : null}
            </Text>
         </View>
      );
   }
}

class MenuItem extends React.Component {
   render() {
      const {restaurant} = this.props;
      return (
         <View style={[MKCardStyles.card, styles.menuItem]}>
            <Text style={{fontSize: 20, paddingBottom: 4}}>{restaurant.name} - {restaurant.distance ? (restaurant.distance / 1000).toFixed(1) + ' km' : null}</Text>
            {restaurant.courses.map(c => <Course key={c.title} course={c} />)}
         </View>
      );
   }
}

class Day extends React.Component {
   constructor() {
      super();
      this.state = {menus: []};
   }
   filter(restaurants) {
      return restaurants.map(r => {
         const courses = r.Menus.find(c => moment(c.date).startOf('day').isSame(this.props.date));
         r.courses = courses ? courses.courses : [];
         return r;
      });
   }
   render() {
      const {date, restaurants} = this.props;
      return (
         <View style={{flex: 1, paddingBottom: 70}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>{date.format('ddd DD.MM.')}</Text>
            </View>
            <ScrollView>
               {restaurants ? this.filter(restaurants).map(r => <MenuItem key={r.id} restaurant={r} />) : null}
            </ScrollView>
         </View>
      );
   }
}

class Menu extends React.Component {
   constructor() {
      super();
      this.state = {
         today: moment().startOf('day')
      };
   }
   componentDidMount() {
      Service.updateLocation()
      .then(l => Service.getRestaurants())
      .then(response => {
         this.setState({restaurants: response});
      }).catch(err => console.log(err));
   }
   changeDay(offset) {

   }
   render() {
      return(
         <View style={styles.container}>
            <Swiper
               style={{position: 'relative'}}
               loop={false}>
               {Array(7).fill(1).map((n, i) => moment(this.state.today).add(i, 'days')).map(date =>
                  (<Day
                     key={date}
                     date={date}
                     restaurants={this.state.restaurants} />)
               )}
            </Swiper>
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
   }
});

export default Menu;
