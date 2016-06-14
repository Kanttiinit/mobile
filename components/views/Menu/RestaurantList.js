import React from 'react';
import moment from 'moment';
import momentFI from 'moment/locale/fi';
import {connect} from 'react-redux';
import {colors, defaultStyles} from '../../../style';

import Restaurant from './Restaurant';

import {View, Text, ListView, StyleSheet} from 'react-native';

moment.locale('fi');
const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class RestaurantList extends React.Component {
   shouldComponentUpdate(props) {
      if (props.currentView === 'RUOKALISTA') {
         return this.props.day !== props.day
            || !props.now.isSame(this.props.now, 'minute');
      }

      return false;
   }
   render() {
      const {day, menus, restaurants} = this.props;
      return (
         <View style={{flex: 1}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>
                  {moment(day).format('dddd').toUpperCase()}
                  <Text style={styles.date}> {moment(day).format('D.M.')}</Text>
               </Text>
            </View>
            <ListView
               initialListSize={1}
               pageSize={2}
               contentContainerStyle={{padding: 14, paddingTop: 4}}
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
      marginBottom: 0,
      height: 50,
      backgroundColor: 'transparent'
   },
   dayTitle: {
      fontSize: 20,
      fontWeight: '300',
      flexDirection: 'row',
      textAlign: 'center',
      flex: 1,
      color: 'black'
   },
   date: {
      color: 'rgba(0, 0, 0, 0.6)'
   }
});

const mapState = state => ({
   currentView: state.misc.currentView,
   now: state.misc.now
});

export default connect(mapState)(RestaurantList);
