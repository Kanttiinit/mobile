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
      this.state = {
         restaurants: []
      };
      moment.locale('fi');
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
         restaurants: sorted,
         order: sorted.map(r => r.id)
      });
   }
   shouldComponentUpdate(nextProps) {
      if (nextProps.restaurants && this.state.order) {
         const newSort = Service.formatRestaurants(nextProps.restaurants, nextProps.date, nextProps.favorites).map(r => r.id);
         return newSort.join(',') === this.state.order.join(',');
      }

      return true;
   }
   render() {
      const {date, favorites} = this.props;
      const {restaurants} = this.state;
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
