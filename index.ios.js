'use strict';

import React from 'react-native';
import Menu from './views/Menu';
const {
   AppRegistry,
   StyleSheet,
   Text,
   View,
} = React;

class Kanttiinit extends React.Component {
   render() {
      return (
         <View style={styles.wrapper}>
            <Menu />
         </View>
      );
   }
};

const styles = StyleSheet.create({
   wrapper: {
      marginTop: 24,
      flex: 1
   }
});

AppRegistry.registerComponent('kanttiinit', () => Kanttiinit);
