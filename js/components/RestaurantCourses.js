import React from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, StyleSheet} from 'react-native';

import {openModal} from '../store/actions/modal';
import Course from './Course';
import Button from './reusable/Button';
import RestaurantDialog from './RestaurantDialog';

const Courses = ({courses, restaurant}) => {
  if (courses.length) {
    return (
      <View>
        {courses.map((course, i) =>
          <Course
            key={i}
            course={course}
            restaurant={restaurant}
            style={[i > 0 && styles.borderTop]} />
        )}
      </View>
    );
  }
  return (
    <View style={{padding: 10}}>
      <Text style={styles.emptyMenuText}>Ei menua saatavilla.</Text>
    </View>
  );
};

export class Restaurant extends React.Component {
  static formatDistance(distance) {
    return distance < 1 ? (distance * 1000).toFixed(0) + ' m' : (distance).toFixed(1) + ' km';
  }
  shouldComponentUpdate(props) {
    if (this.props.day !== props.day)
      return true;

    return props.restaurant.id !== this.props.restaurant.id
      || props.restaurant.isOpen !== this.props.restaurant.isOpen
      || props.restaurant.favorited !== this.props.restaurant.favorited
      || props.restaurant.distance !== this.props.restaurant.distance;
  }
  render() {
    const {day, isToday, restaurant, openModal, courses} = this.props;
    const metaColor = isToday && restaurant.isOpen ? colors.darkAccent : colors.darkGrey;

    return (
      <View style={[defaultStyles.card, !courses.length && {opacity: 0.7}]}>

        <Button
          onPress={() => openModal(<RestaurantDialog restaurant={restaurant} />, {padding: 0})}
          style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}
          containerStyle={styles.header}>
          <View style={{flex: 1}}>
            <Text style={[styles.restaurantName, !(isToday && restaurant.isOpen) && {color: colors.darkGrey}]}>
              {restaurant.name}
            </Text>
            <View style={{flex: 1, marginTop: 2, flexDirection: 'row'}}>
              <Text style={[styles.metaText, {color: metaColor}]}>
                <Icon size={10} name="md-time" />
                {' '}
                {restaurant.openingHours[moment(day).weekday()] || 'suljettu'}
              </Text>
              {restaurant.distance &&
                <Text style={[styles.metaText, {marginLeft: 8, color: metaColor}]}>
                  <Icon size={10} name="md-walk" />
                  {' '}
                  {Restaurant.formatDistance(restaurant.distance)}
                </Text>
              }
            </View>
          </View>
          {restaurant.favorited && <Icon size={22} color={colors.yellow} name="md-star" />}
        </Button>

        <Courses courses={courses} restaurant={restaurant} />

      </View>
    );
  }
}

const mapDispatch = dispatch => bindActionCreators({openModal}, dispatch);

export default connect(null, mapDispatch)(Restaurant);

const styles = StyleSheet.create({
  header: {
    padding: spaces.medium,
    justifyContent: 'center'
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey
  },
  emptyMenuText: {
    color: colors.grey,
    fontSize: 12,
    textAlign: 'center'
  },
  metaText: {
    color: colors.darkGrey,
    fontSize: 11,
    marginVertical: 2,
    opacity: 0.8
  },
  restaurantName: {
    fontSize: 18,
    color: colors.accentDark
  }
});
