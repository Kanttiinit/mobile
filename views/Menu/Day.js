'use strict';

import React from 'react-native';

import moment from 'moment';
import momentFI from 'moment/locale/fi';

import Service from '../../managers/Service';

import Restaurant from './Restaurant';

const {
   View,
   Text,
   ListView,
   Component,
   StyleSheet,
   Platform
} = React;

class Day extends Component {
   constructor() {
      super();
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {};
      moment.locale('fi');
   }
   render() {
      const {date, favorites} = this.props;
      const restaurants = Service.formatRestaurants(this.props.restaurants, date, favorites);
      return (
         <View style={{flex: 1}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>
                  {date.format('dddd').toUpperCase()}
                  <Text style={styles.date}> {date.format('DD.MM.')}</Text>
               </Text>
            </View>
            <ListView
               initialListSize={2}
               pageSize={3}
               dataSource={this.dataSource.cloneWithRows(restaurants)}
               renderRow={restaurant =>
                  <Restaurant date={date} restaurant={restaurant} />} />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   daySelector: {
      flexDirection: 'row',
      padding: 14
   },
   dayTitle: {
      fontSize: 20,
      fontWeight: '300',
      flex: 1,
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined
   },
   date: {
      color: '#bababa'
   }
});

export default Day;
