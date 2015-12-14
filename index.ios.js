'use strict';

import React from 'react-native';
import TabView from 'react-native-scrollable-tab-view';
import Menu from './views/Menu';
import Favourites from './views/Favourites';
const {
   AppRegistry,
   StyleSheet,
   Text,
   View,
} = React;

const kanttiinit = React.createClass({
   render() {
      return (
         <TabView>
            <Menu tabLabel="Menu" />
            <Favourites tabLabel="Favs" />
         </TabView>
      );
   }
});

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
   },
   welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
   },
   instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   },
});

AppRegistry.registerComponent('kanttiinit', () => kanttiinit);
