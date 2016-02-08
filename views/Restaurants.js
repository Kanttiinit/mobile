'use strict';

import React from 'react-native';
import {MKColor} from 'react-native-material-kit';
import Service from '../managers/Service';
import Loader from '../components/Loader';
import {connect} from 'react-redux';

import Area from './Restaurants/Area';

const {
   ListView,
   View,
   StyleSheet,
   Platform
} = React;

class Restaurants extends React.Component {
   constructor() {
      super();
      this.state = {};
   }
   componentDidMount() {
      if (!this.state.areas) {
         Service.getAreas()
         .then(areas => {
            const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
               areas: dataSource.cloneWithRows(areas)
            });
         })
         .catch(e => console.error(e));
      }
   }
   render() {
      return (
         <View style={styles.container}>
            {this.state.areas ?
            <ListView
               dataSource={this.state.areas}
               renderRow={area => <Area area={area} />} />
            : <Loader color={MKColor.Teal} />}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: MKColor.Silver
   }
});

export default connect()(Restaurants);
