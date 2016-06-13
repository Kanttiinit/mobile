import React from 'react';
import moment from 'moment';
import momentFI from 'moment/locale/fi';
import {connect} from 'react-redux';
import {colors, defaultStyles} from '../../../style';

import Restaurant from './Restaurant';

import {
   View,
   Text,
   ListView,
   Platform,
   StyleSheet,
   InteractionManager
} from 'react-native';

moment.locale('fi');
const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class RestaurantList extends React.Component {
   shouldComponentUpdate(props) {
      if (props.currentView === 'RUOKALISTA') {
         return this.props.day !== props.day
            || this.props.menus !== props.menus
            || !props.now.isSame(this.props.date, 'minute');
      }

      return false;
   }
   render() {
      const {day, menus, restaurants} = this.props;
      return (
         <View style={{flex: 1}}>
            <View style={[defaultStyles.card, styles.daySelector]}>
               <Text style={styles.dayTitle}>
                  {moment(day).format('dddd').toUpperCase()}
                  <Text style={styles.date}> {moment(day).format('D.M.')}</Text>
               </Text>
            </View>
            <ListView
               initialListSize={1}
               pageSize={2}
               contentContainerStyle={{padding: 18}}
               dataSource={dataSource.cloneWithRows(restaurants)}
               renderRow={restaurant =>
                  <Restaurant restaurant={restaurant} day={day} />
               } />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   daySelector: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: colors.accent,
      marginBottom: 0,
      height: 50,
   },
   dayTitle: {
      fontSize: 20,
      fontWeight: '300',
      flexDirection: 'row',
      textAlign: 'center',
      flex: 1,
      color: 'white'
   },
   date: {
      color: 'rgba(255, 255, 255, 0.6)'
   }
});

const mapState = state => ({
   currentView: state.misc.currentView,
   now: state.misc.now,
   menus: state.menus
});

export default connect(mapState)(RestaurantList);
