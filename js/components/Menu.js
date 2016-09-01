// @flow
import React from 'react';
import moment from 'moment';
import 'moment/locale/fi';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View} from 'react-native';

import Loader from './reusable/Loader';
import RestaurantList from './RestaurantList';
import AreaSelector from './AreaSelector';
import {setDayOffset} from '../store/actions/values';
import {orderedRestaurants, selectLang} from '../store/selectors';
import Dropdown from './reusable/Dropdown';
import {colors} from '../utils/style';

class Menu extends React.Component {
  shouldComponentUpdate(props) {
    return props.currentView === 'menus';
  }
  renderDayTitle(day, lang) {
    day = moment(day).locale(lang);
    return `${day.format('dddd').toUpperCase()} ${day.format('D.M.')}`;
  }
  render() {
    const {dayOffset, lang, setDayOffset, loading, days, restaurants} = this.props;
    const renderContent = () => {
      if (loading) {
        return <Loader color={colors.accent} />;
      } else if (!restaurants.length) {
        return <AreaSelector />;
      } else {
        return (
          <View style={{flex: 1}}>
            <Dropdown
              options={days.map((day, i) => ({value: i, label: this.renderDayTitle(day, lang)}))}
              selected={dayOffset}
              onSelect={value => setDayOffset(value)} />
            <RestaurantList
              day={days[dayOffset]}
              restaurants={restaurants} />
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

const mapState = state => ({
  restaurants: orderedRestaurants(state),
  days: state.value.days,
  currentView: state.value.currentView,
  loading: state.pending.menus || state.pending.restaurants,
  dayOffset: state.value.dayOffset,
  lang: selectLang(state)
});

const mapDispatch = dispatch => bindActionCreators({setDayOffset}, dispatch);

export default connect(mapState, mapDispatch)(Menu);
