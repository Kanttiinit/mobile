// @flow
import React from 'react';
import moment from 'moment';
import 'moment/locale/fi';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import _ from 'lodash';

import RestaurantList from './RestaurantList';
import AreaSelector from './AreaSelector';
import {setDayOffset} from '../store/actions/values';
import {orderedRestaurants, selectLang} from '../store/selectors';
import PlaceholderText from './reusable/PlaceholderText';
import {colors, spaces, defaultStyles} from '../utils/style';

const PlaceholderList = () => (
  <View style={{flex: 1}}>
    {_.times(6, i =>
    <View
      key={i}
      style={[defaultStyles.card, {height: 250, padding: spaces.small, margin: spaces.medium, backgroundColor: colors.white}]}>
      <PlaceholderText height={24} width={150} />
      <PlaceholderText height={12} width={200} />
    </View>
    )}
  </View>
);

class Menu extends React.Component {
  shouldComponentUpdate(props) {
    return props.currentView === 'menus';
  }
  renderDayTitle(day, lang) {
    day = moment(day).locale(lang);
    return `${day.format('ddd').toUpperCase()} ${day.format('D.M.')}`;
  }
  render() {
    const {dayOffset, lang, setDayOffset, initializing, loading, days, restaurants} = this.props;
    const renderContent = () => {
      if (initializing) {
        return null;
      } else if (!loading && !initializing && !restaurants.length) {
        return <AreaSelector />;
      } else {
        return (
          <View style={{flex: 1}}>
            <ScrollView
              style={styles.dayPillContainer}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {days.map((day, i) =>
              <TouchableOpacity
                key={day}
                style={[styles.dayPill, dayOffset === i && styles.selectedDayPill]}
                onPress={() => setDayOffset(i)}>
                <Text style={{color: colors.accent}}>{this.renderDayTitle(day, lang)}</Text>
              </TouchableOpacity>
              )}
            </ScrollView>
            {loading || initializing ? <PlaceholderList /> :
            <RestaurantList
              day={days[dayOffset]}
              restaurants={restaurants} />
            }
          </View>
        );
      }
    };

    return (
      <View style={{flex: 1, backgroundColor: colors.lightGrey}}>
        {renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dayPillContainer: {
    flex: 0,
    margin: spaces.medium
  },
  dayPill: {
    padding: spaces.medium,
    borderRadius: spaces.small
  },
  selectedDayPill: {
    backgroundColor: colors.accentOpaque
  }
});

const mapState = state => ({
  restaurants: orderedRestaurants(state),
  days: state.value.days,
  currentView: state.value.currentView,
  loading: state.pending.menus || state.pending.restaurants,
  dayOffset: state.value.dayOffset,
  lang: selectLang(state),
  initializing: state.value.initializing
});

const mapDispatch = dispatch => bindActionCreators({setDayOffset}, dispatch);

export default connect(mapState, mapDispatch)(Menu);
