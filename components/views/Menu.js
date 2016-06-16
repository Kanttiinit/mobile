import React from 'react';
import moment from 'moment';
import Swiper from '../Swiper';
import Loader from '../Loader';
import haversine from 'haversine';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import RestaurantList from './Menu/RestaurantList';
import DaySelector from './Menu/DaySelector';
import AreaSelector from './Menu/AreaSelector';
import {colors} from '../../style';
import {setDayOffset} from '../../store/actions/menus';

import {View, StyleSheet, Text} from 'react-native';

class Menu extends React.Component {
   componentWillReceiveProps(props) {
      if (this.props.viewChanges !== props.viewChanges && props.currentView === 'RUOKALISTA' && this.props.currentView === 'RUOKALISTA')
         this.props.setDayOffset(0);
   }
   shouldComponentUpdate(props) {
      return props.currentView === 'RUOKALISTA';
   }
   renderContent() {
      const {dayOffset, loading, days, restaurants} = this.props;
      if (this.props.loading) {
         return <Loader color={colors.accent} />
      } else if (!restaurants.length) {
         return <AreaSelector />;
      } else {
         return (
            <View>
               <Swiper
                  page={dayOffset}
                  onPageChange={page => this.props.setDayOffset(page)}>
                  {days.map(day =>
                  <RestaurantList
                     key={day}
                     day={day}
                     restaurants={restaurants} />
                  )}
               </Swiper>
               <DaySelector max={days.length - 1} />
            </View>
         );
      }
   }
   render() {
      return (
         <View style={styles.container}>
            {this.renderContent()}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.lightGrey,
      flex: 1,
      position: 'relative'
   }
});

const mapState = state => ({
   restaurants: state.restaurants.restaurants.filter(r => state.restaurants.selected.indexOf(r.id) > -1),
   days: state.misc.days,
   viewChanges: state.misc.views,
   currentView: state.misc.currentView,
   loading: state.menus.loading || state.restaurants.loading,
   dayOffset: state.menus.dayOffset
});

const mapDispatch = dispatch => bindActionCreators({setDayOffset}, dispatch);

export default connect(mapState, mapDispatch)(Menu);
