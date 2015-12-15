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
         const courses = r.Menus.find(c => moment(c.date).startOf('day').isSame(this.props.date));
         r.courses = courses ? courses.courses : [];
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
      this.state = {
         selectedDay: moment().startOf('day')
      };
   }
   componentDidMount() {
      fetch('http://api.kanttiinit.fi/areas/1/menus')
      .then(r => r.json())
      .then(response => {
         this.setState({restaurants: response});
      });
   }
   changeDay(offset) {
      this.setState({
         selectedDay: this.state.selectedDay.add(offset, 'day')
      });
   }
   render() {
      return(
         <View style={styles.container}>
            <View style={styles.daySelector}>
               <MKButton backgroundColor={MKColor.Grey} style={styles.dayChangeButton} onPress={() => this.changeDay(-1)}>
                  <Text style={{color: MKColor.Silver}}>Prev</Text>
               </MKButton>
               <Text style={styles.dayTitle}>{this.state.selectedDay.format('dddd')}</Text>
               <MKButton backgroundColor={MKColor.Grey} style={styles.dayChangeButton} onPress={() => this.changeDay(1)}>
                  <Text style={{color: MKColor.Silver}}>Next</Text>
               </MKButton>
            </View>
            <Day date={this.state.selectedDay} restaurants={this.state.restaurants} />
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
      textAlign: 'center'
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
