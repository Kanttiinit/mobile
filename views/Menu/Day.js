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
   Platform,
   StyleSheet
} = React;

export default class Day extends Component {
   constructor() {
      super();
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      moment.locale('fi');
      this.state = {
         restaurants: []
      };
   }
   componentDidMount() {
      this.update(this.props);
   }
   componentWillReceiveProps(nextProps) {
      this.update(nextProps);
   }
   update(props) {
      const sorted = Service.formatRestaurants(props.restaurants, props.date, props.favorites);
      this.setState({
         restaurants: sorted
      });
   }
   shouldComponentUpdate(nextProps) {
      return true;
   }
   render() {
      const {date, favorites} = this.props;
      const {restaurants, currentPage} = this.state;
      return (
         <View style={{flex: 1}}>
            <View style={styles.daySelector}>
               <Text style={styles.dayTitle}>
                  {date.format('dddd').toUpperCase()}
                  <Text style={styles.date}> {date.format('DD.MM.')}</Text>
               </Text>
            </View>
            <ListView
               initialListSize={1}
               pageSize={2}
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
      paddingHorizontal: 14,
      paddingVertical: 8,
      alignItems: 'center'
   },
   dayTitle: {
      fontSize: 20,
      fontWeight: '300',
      fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
      flexDirection: 'row',
      textAlign: 'center',
      flex: 1
   },
   date: {
      color: '#bababa'
   }
});
