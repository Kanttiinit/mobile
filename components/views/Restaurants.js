'use strict';

import React from 'react-native';
import Loader from '../Loader';
import {connect} from 'react-redux';

import Area from './Restaurants/Area';
import {getAreas} from '../../store/actions';
import {colors} from '../../style';

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
      this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
   }
   componentDidMount() {
      this.props.getAreas();
   }
   render() {
      return (
         <View style={styles.container}>
            {this.props.areas ?
            <ListView
               style={{paddingTop: 22}}
               dataSource={this.dataSource.cloneWithRows(this.props.areas)}
               renderRow={area => <Area area={area} />} />
            : <Loader color={colors.accent} />}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.lightGrey
   }
});

export default connect(
   state => ({
      areas: state.areas
   }),
   dispatch => ({
      getAreas: () => dispatch(getAreas())
   })
)(Restaurants);
