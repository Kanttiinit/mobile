'use strict';

import React from 'react-native';
import Menu from './views/Menu';
const {
   AppRegistry,
   StyleSheet,
   Text,
   View,
   Navigator
} = React;

class Kanttiinit extends React.Component {
   renderScene(route, navigator) {
      return route.component;
   }
   render() {
      return (
         <View style={styles.wrapper}>
            <Navigator
               initialRoute={{component: Menu}}
               renderScene={this.renderScene} />
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
