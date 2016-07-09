import React from 'react';
import moment from 'moment';
import haversine from 'haversine';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text} from 'react-native';

import Swiper from './reusable/Swiper';
import Loader from './reusable/Loader';
import RestaurantList from './RestaurantList';
import DaySelector from './DaySelector';
import AreaSelector from './AreaSelector';
import {setDayOffset} from '../store/actions/menus';
import {selectedRestaurants} from '../store/selectors';

class Menu extends React.Component {
   componentWillReceiveProps(props) {
      if (this.props.viewChanges !== props.viewChanges && props.currentView === 'Ruokalista' && this.props.currentView === 'Ruokalista')
         this.props.setDayOffset(0);
   }
   shouldComponentUpdate(props) {
      return props.currentView === 'Ruokalista';
   }
   renderContent() {
      const {dayOffset, setDayOffset, loading, days, restaurants} = this.props;
      if (loading) {
         return <Loader color={colors.accent} />
      } else if (!restaurants.length) {
         return <AreaSelector />;
      } else {
         return (
            <View style={{flex: 1}}>
               <Swiper
                  page={dayOffset}
                  onPageChange={page => setDayOffset(page)}>
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
         <View style={{flex: 1, backgroundColor: colors.lightGrey}}>
            {this.renderContent()}
         </View>
      );
   }
}

const mapState = state => ({
   restaurants: selectedRestaurants(state),
   days: state.misc.days,
   viewChanges: state.misc.views,
   currentView: state.misc.currentView,
   loading: state.menus.loading || state.restaurants.loading,
   dayOffset: state.menus.dayOffset
});

const mapDispatch = dispatch => bindActionCreators({setDayOffset}, dispatch);

export default connect(mapState, mapDispatch)(Menu);
