import React from 'react';
import moment from 'moment';
import Swiper from '../Swiper';
import Loader from '../Loader';
import haversine from 'haversine';
import {connect} from 'react-redux';

import RestaurantList from './Menu/RestaurantList';
import DaySelector from './Menu/DaySelector';
import AreaSelector from './Menu/AreaSelector';
import {colors} from '../../style';

import {
   View,
   StyleSheet,
   AppState,
   DeviceEventEmitter,
   Text
} from 'react-native';

class Menu extends React.Component {
   onDaySelectorChange(p) {
      this.refs.swiper.setPage(p);
   }
   onSwiperChange(p) {
      this.refs.daySelector.setCurrent(p);
   }
   componentWillReceiveProps(props) {
      if (this.props.viewChanges !== props.viewChanges && props.currentView === 'RUOKALISTA' && this.props.currentView === 'RUOKALISTA' && this.refs.swiper)
         this.refs.swiper.setPage(0);
   }
   shouldComponentUpdate(props) {
      return props.currentView === 'RUOKALISTA';
   }
   render() {
      const {restaurants, loading, days} = this.props;
      return (
         <View style={styles.container}>
            {loading ?
            <Loader color={colors.accent} />
            : !restaurants.length ?
            <AreaSelector />
            :
            <Swiper
               ref="swiper"
               onPageChange={this.onSwiperChange.bind(this)}>
               {days.map(day =>
                  <RestaurantList
                     key={day}
                     day={day}
                     restaurants={restaurants} />
               )}
            </Swiper>
            }

            {!loading && restaurants.length &&
            <DaySelector ref="daySelector" onChange={this.onDaySelectorChange.bind(this)} max={days.length - 1} />
            }
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
   loading: state.menus.loading || state.restaurants.loading
});

export default connect(mapState)(Menu);
