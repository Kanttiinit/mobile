'use strict';

import React from 'react-native';
import Material from 'react-native-material-kit';
import moment from 'moment';

const {
   ScrollView,
   View,
   Text,
   StyleSheet
} = React;

const {
   MKCardStyles,
   MKButton
} = Material;

class Course extends React.Component {
   render() {
      const {course} = this.props;
      console.log(course);
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
            <Text style={{fontSize: 20, paddingBottom: 4}}>{restaurant.name}</Text>
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
         r.courses = r.Menus.find(c => moment(c.date).startOf('day').isSame(this.props.date)).courses;
         return r;
      });
   }
   render() {
      const {date, restaurants} = this.props;
      return (
         <ScrollView style={{flex: 1}}>
            {restaurants ? this.filter(restaurants).map(r => <MenuItem key={r.id} restaurant={r} />) : null}
         </ScrollView>
      );
   }
}

class Menu extends React.Component {
   constructor() {
      super();
      this.state = {};
   }
   componentDidMount() {
      fetch('http://api.kanttiinit.fi/areas/1/menus')
      .then(r => r.json())
      .then(response => {
         this.setState({restaurants: response});
      });
   }
   render() {
      return(
         <View style={styles.container}>
            <Text style={styles.dayTitle}>{moment().startOf('day').format('dddd')}</Text>
            <Day date={moment().startOf('day')} restaurants={this.state.restaurants} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#f6f6f6',
      flex: 1
   },
   dayTitle: {
      fontSize: 24,
      padding: 8,
      textAlign: 'center'
   },
   menuItem: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      padding: 8
   }
});

export default Menu;
