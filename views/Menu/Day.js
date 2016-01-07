'use strict';

import React from 'react-native';
import moment from 'moment';

import Service from '../../managers/Service';
import Restaurant from './Restaurant';

const {
   View,
   Text,
   ListView,
   Component,
   Platform
} = React;

class Day extends Component {
   constructor() {
      super();
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
         restaurants: sorted,
         order: sorted.map(r => r.id)
      });
   }
   shouldComponentUpdate(nextProps) {
      if (nextProps.restaurants && this.state.order) {
         const newSort = Service.formatRestaurants(nextProps.restaurants, nextProps.date, nextProps.favorites).map(r => r.id);
         return newSort.join(',') !== this.state.order.join(',');
      }

      return true;
   }
   render() {
      const {date, favorites} = this.props;
      const {restaurants, currentPage} = this.state;
      return (
         <ListView
            initialListSize={2}
            pageSize={3}
            dataSource={this.dataSource.cloneWithRows(restaurants)}
            renderRow={restaurant =>
               <Restaurant date={date} restaurant={restaurant} />} />
      );
   }
   componentDidUpdate() {
      console.log('day did update');
   }
}

export default Day;
