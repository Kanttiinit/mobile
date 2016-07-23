import React from 'react';
import moment from 'moment';
import 'moment/locale/fi';
import haversine from 'haversine';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, Picker} from 'react-native';

import Loader from './reusable/Loader';
import RestaurantList from './RestaurantList';
import AreaSelector from './AreaSelector';
import {setDayOffset} from '../store/actions/values';
import {orderedRestaurants} from '../store/selectors';

class Menu extends React.Component {
   componentWillReceiveProps(props) {
      if (this.props.viewChanges !== props.viewChanges && props.currentView === 'Ruokalista' && this.props.currentView === 'Ruokalista')
         this.props.setDayOffset(0);
   }
   shouldComponentUpdate(props) {
      return props.currentView === 'Ruokalista';
   }
   renderDayTitle(day) {
      day = moment(day).locale('fi');
      return `${day.format('dddd').toUpperCase()} ${day.format('D.M.')}`;
   }
   render() {
      const {dayOffset, setDayOffset, loading, days, restaurants} = this.props;

      const renderContent = () => {
         if (loading) {
            return <Loader color={colors.accent} />
         } else if (!restaurants.length) {
            return <AreaSelector />;
         } else {
            return (
               <View style={{flex: 1}}>
                  <Picker
                     mode="dropdown"
                     style={{height: 150, marginTop: -70}}
                     selectedValue={dayOffset}
                     onValueChange={dayOffset => setDayOffset(dayOffset)}>
                     {days.map((day, i) =>
                     <Picker.Item key={i} value={i} label={this.renderDayTitle(day)} />
                     )}
                  </Picker>
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
   viewChanges: state.value.views,
   currentView: state.value.currentView,
   loading: state.pending.menus || state.pending.restaurants,
   dayOffset: state.value.dayOffset
});

const mapDispatch = dispatch => bindActionCreators({setDayOffset}, dispatch);

export default connect(mapState, mapDispatch)(Menu);
